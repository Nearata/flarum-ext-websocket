<?php

namespace Nearata\Websocket\Api\Controller;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
}
