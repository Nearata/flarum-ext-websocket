<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\Cookies;
use Dflydev\FigCookies\FigResponseCookies;
use Firebase\JWT\JWT;
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
    protected $settings;
    protected $cookie;

    public function __construct(SettingsRepositoryInterface $settings, CookieFactory $cookie)
    {
        $this->settings = $settings;
        $this->cookie = $cookie;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest()) {
            return new EmptyResponse(403);
        }

        $type = Arr::get($request->getParsedBody(), 'generate');
        $isChannel = Arr::get($request->getParsedBody(), 'isChannel');

        if (is_null($type) || is_null($isChannel) || !Str::contains($type, ['main', 'discussions', 'notifications'])) {
            return new EmptyResponse(403);
        }

        /** @var \phpcent\Client */
        $centrifugo = resolve('centrifugo');

        $cookies = Cookies::fromRequest($request);
        $cookie = $cookies->get('flarum_nearata_websocket_' . $type);

        $time = 60*2; // 2 minutes
        $timestamp = time() + $time;

        $json = [];

        $flag = is_null($cookie) || $this->isTokenExpired($cookie->getValue());

        if ($flag) {
            if ($isChannel) {
                $json['token'] = $centrifugo->generateSubscriptionToken($actor->id, 'flarum:' . $type, $timestamp);
            } else {
                $json['token'] = $centrifugo->generateConnectionToken($actor->id, $timestamp);
            }
        } else {
            $json['token'] = $cookie->getValue();
        }

        $response = new JsonResponse($json);

        if ($flag) {
            $response = FigResponseCookies::set($response, $this->cookie->make('nearata_websocket_' . $type, $json['token'], $time));
        }

        return $response;
    }

    private function isTokenExpired(string $jwt): bool
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
