<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\Cookies;
use Dflydev\FigCookies\FigResponseCookies;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Flarum\Http\CookieFactory;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Laminas\Diactoros\Response\JsonResponse;
use Nearata\Websocket\Exception\BadRequestException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract class AbstractRefreshTokenController implements RequestHandlerInterface
{
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

        $cookieName = $this->cookieName();

        $token = $this->getTokenFromCookie($request, "flarum_nearata_websocket_$cookieName");
        $flag = is_null($token)
            || $this->isTokenInvalid($token)
            || $this->hasActorLoggedIn($token, $actor);

        $minutes = 60 * $this->settings->get('nearata-websocket.jwt-exp');

        if ($flag) {
            $payload = [
                'sub' => $actor->isGuest() ? '' : "$actor->id",
                'exp' => time() + $minutes
            ];

            if ($this->isChannel()) {
                $payload += [
                    'channel' => $this->getChannel($request)
                ];
            }

            $token = $this->generateToken($payload);
        }

        $response = new JsonResponse(['token' => $token]);

        if ($flag) {
            $response = FigResponseCookies::set($response, $this->cookie->make("nearata_websocket_$cookieName", $token, $minutes));
        }

        return $response;
    }

    abstract protected function cookieName(): string;

    protected function isChannel(): bool
    {
        return true;
    }

    protected function getChannel(ServerRequestInterface $request): string
    {
        $channel = Arr::get($request->getParsedBody(), 'channel', '');

        if (empty($channel) || !Str::contains($channel, resolve('centrifugo.channels'))) {
            throw new BadRequestException;
        }

        return $channel;
    }

    private function generateToken(array $payload): string
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        return JWT::encode($payload, $key, 'HS256');
    }

    private function isTokenInvalid(string $jwt): bool
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        try {
            JWT::decode($jwt, new Key($key, 'HS256'));
            return false;
        } catch (\Throwable $th) {
            return true;
        }
    }

    private function hasActorLoggedIn(string $jwt, User $actor): bool
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        $payload = JWT::decode($jwt, new Key($key, 'HS256'));

        return empty($payload->sub) && !$actor->isGuest();
    }

    private function getTokenFromCookie(ServerRequestInterface $request, string $name): ?string
    {
        $cookie = Cookies::fromRequest($request)->get("flarum_nearata_websocket_$name");

        return !is_null($cookie) && !is_null($cookie->getValue()) ? $cookie->getValue() : null;
    }
}
