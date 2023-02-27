<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\Cookies;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

trait JwtTrait
{
    public function generateToken(array $payload): string
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        return JWT::encode($payload, $key, 'HS256');
    }

    public function isTokenInvalid(string $jwt): bool
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        try {
            JWT::decode($jwt, new Key($key, 'HS256'));
            return false;
        } catch (\Throwable $th) {
            return true;
        }
    }

    public function hasActorLoggedIn(string $jwt, User $actor): bool
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        $payload = JWT::decode($jwt, new Key($key, 'HS256'));

        return empty($payload->sub) && !$actor->isGuest();
    }

    public function getCookie(ServerRequestInterface $request, string $name): ?string
    {
        $cookie = Cookies::fromRequest($request)->get($name);

        return !is_null($cookie) && !is_null($cookie->getValue()) ? $cookie->getValue() : null;
    }
}
