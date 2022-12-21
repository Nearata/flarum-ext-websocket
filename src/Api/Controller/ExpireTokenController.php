<?php

namespace Nearata\Websocket\Api\Controller;

use Dflydev\FigCookies\FigResponseCookies;
use Flarum\Http\CookieFactory;
use Flarum\Settings\SettingsRepositoryInterface;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class ExpireTokenController implements RequestHandlerInterface
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
        $response = new EmptyResponse();

        $response = FigResponseCookies::set(
            $response,
            $this->cookie->expire('nearata_websocket')
        );
        $response = FigResponseCookies::set(
            $response,
            $this->cookie->expire('nearata_websocket_discussions')
        );
        $response = FigResponseCookies::set(
            $response,
            $this->cookie->expire('nearata_websocket_notifications')
        );

        return $response;
    }
}
