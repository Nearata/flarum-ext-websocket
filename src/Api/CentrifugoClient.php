<?php

namespace Nearata\Websocket\Api;

use Illuminate\Http\Client\Factory;
use Illuminate\Http\Client\Response;

class CentrifugoClient
{
    public function publish(string $channel, array $payload): Response
    {
        return Factory::centrifugo()->post('/api', [
            'method' => 'publish',
            'params' => [
                'channel' => $channel,
                'data' => $payload
            ]
        ]);
    }

    public function getChannels(): Response
    {
        return Factory::centrifugo()
            ->withBody('{"method": "channels", "params": {}}', 'application/json')
            ->post('/api');
    }
}
