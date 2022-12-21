<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\Cookies;
use Dflydev\FigCookies\FigResponseCookies;
use Flarum\Http\CookieFactory;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
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

        /** @var \phpcent\Client */
        $centrifugo = resolve('centrifugo');

        $cookies = Cookies::fromRequest($request);
        $tokens = [];

        $time = time() + 60*2;

        $main = $cookies->get('flarum_nearata_websocket');
        $discussions = $cookies->get('flarum_nearata_websocket_discussions');
        $notifications = $cookies->get('flarum_nearata_websocket_notifications');

        if (is_null($main)) {
            $jwt = $centrifugo->generateConnectionToken($actor->id, $time);
            $tokens['main'] = $jwt;
        } else {
            $tokens['main'] = $main->getValue();
        }

        if (is_null($discussions)) {
            $jwt = $centrifugo->generateSubscriptionToken($actor->id, 'flarum:discussions', $time);
            $tokens['discussions'] = $jwt;
        } else {
            $tokens['discussions'] = $discussions->getValue();
        }

        if (is_null($notifications)) {
            $jwt = $centrifugo->generateSubscriptionToken($actor->id, 'flarum:notifications', $time);
            $tokens['notifications'] = $jwt;
        } else {
            $tokens['notifications'] = $notifications->getValue();
        }

        $response = new JsonResponse($tokens);

        if (is_null($main)) {
            $response = FigResponseCookies::set($response, $this->cookie->make('nearata_websocket', $tokens['main'], 60*2));
        }

        if (is_null($discussions)) {
            $response = FigResponseCookies::set($response, $this->cookie->make('nearata_websocket_discussions', $tokens['discussions'], 60*2));
        }

        if (is_null($notifications)) {
            $response = FigResponseCookies::set($response, $this->cookie->make('nearata_websocket_notifications', $tokens['notifications'], 60*2));
        }

        return $response;
    }
}
