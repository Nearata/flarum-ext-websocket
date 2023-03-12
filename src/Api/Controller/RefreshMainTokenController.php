<?php

namespace Nearata\Websocket\Api\Controller;

class RefreshMainTokenController extends AbstractRefreshTokenController
{
    protected function cookieName(): string
    {
        return 'main';
    }

    protected function isChannel(): bool
    {
        return false;
    }
}
