<?php

namespace Nearata\Websocket\Api\Controller;

use Firebase\JWT\JWT;

trait JwtTrait
{
    public function generateToken(array $payload): string
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        return JWT::encode($payload, $key, 'HS256');
    }

    public function isTokenExpired(string $jwt): bool
    {
        $key = $this->settings->get('nearata-websocket.hmac-key');

        try {
            JWT::decode($jwt, $key);
            return false;
        } catch (\Throwable $th) {
            return $th instanceof \Firebase\JWT\ExpiredException;
        }
    }
}
