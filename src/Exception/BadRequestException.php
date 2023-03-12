<?php

namespace Nearata\Websocket\Exception;

use Exception;
use Flarum\Foundation\KnownError;

class BadRequestException extends Exception implements KnownError
{
    public function getType(): string
    {
        return 'http_bad_request';
    }
}
