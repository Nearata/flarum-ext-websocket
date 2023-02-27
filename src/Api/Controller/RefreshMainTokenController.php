<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\FigResponseCookies;
use Flarum\Http\CookieFactory;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class RefreshMainTokenController implements RequestHandlerInterface
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
        $actor = RequestUtil::getActor($request);

        $cookieValue = $this->getCookie($request, 'flarum_nearata_websocket_main');
        $flag = is_null($cookieValue)
            || $this->isTokenInvalid($cookieValue)
            || $this->hasActorLoggedIn($cookieValue, $actor);

        $minutes = 60 * $this->settings->get('nearata-websocket.jwt-exp');

        if ($flag) {
            $token = $this->generateToken([
                'sub' => $actor->isGuest() ? '' : "$actor->id",
                'exp' => time() + $minutes
            ]);
        } else {
            $token = $cookieValue;
        }

        $response = new JsonResponse(['token' => $token]);

        if ($flag) {
            $response = FigResponseCookies::set($response, $this->cookie->make('nearata_websocket_main', $token, $minutes));
        }

        return $response;
    }
}
