<?php

namespace Nearata\Websocket\Api\Controller;

use Illuminate\Support\Str;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RefreshTokenController extends AbstractRefreshTokenController
{
    /**
     * @var string
     */
    protected $cookieName;

    protected function cookieName(): string
    {
        return $this->cookieName;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $channel = $this->getChannel($request);

        $this->cookieName = Str::after($channel, ':');

        return parent::handle($request);
    }
}
