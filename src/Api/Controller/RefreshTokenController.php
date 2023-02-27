<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\FigResponseCookies;
use Flarum\Http\CookieFactory;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Laminas\Diactoros\Response\EmptyResponse;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class RefreshTokenController implements RequestHandlerInterface
{
    use JwtTrait;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var CookieFactory
     */
    protected $cookie;

    public function __construct(SettingsRepositoryInterface $settings, CookieFactory $cookie)
    {
        $this->settings = $settings;
        $this->cookie = $cookie;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $channel = Arr::get($request->getParsedBody(), 'channel', '');

        if (empty($channel) || !Str::contains($channel, resolve('centrifugo.channels'))) {
            return new EmptyResponse(400);
        }

        $actor = RequestUtil::getActor($request);

        $cookieValue = $this->getCookie($request, "flarum_nearata_websocket_$channel");
        $flag = is_null($cookieValue)
            || $this->isTokenInvalid($cookieValue)
            || $this->hasActorLoggedIn($cookieValue, $actor);

        $minutes = 60 * $this->settings->get('nearata-websocket.jwt-exp');

        if ($flag) {
            $token = $this->generateToken([
                'sub' => $actor->isGuest() ? '' : "$actor->id",
                'exp' => time() + $minutes,
                'channel' => "flarum:$channel"
            ]);
        } else {
            $token = $cookieValue;
        }

        $response = new JsonResponse(['token' => $token]);

        if ($flag) {
            $response = FigResponseCookies::set($response, $this->cookie->make("nearata_websocket_$channel", $token, $minutes));
        }

        return $response;
    }
}
