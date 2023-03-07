<?php

namespace Nearata\Websocket\Post\Listener;

use Flarum\Post\Event\Posted;
use Flarum\User\Guest;
use Flarum\User\User;
use Illuminate\Support\Str;
use Nearata\Websocket\Api\CentrifugoClient;

class PostedListener
{
    /**
     * @var CentrifugoClient
     */
    protected $client;

    public function __construct(CentrifugoClient $client)
    {
        $this->client = $client;
    }

    public function handle(Posted $event)
    {
        $payload = [
            'postId' => $event->post->id,
            'discussionId' => $event->post->discussion->id
        ];

        if ($event->post->isVisibleTo(new Guest())) {
            $this->client->publish('flarum:discussions', $payload);
        } else {
            $response = $this->client->getChannels();

            if (!$response->successful()) {
                return;
            }

            if (!is_null($response->json('error'))) {
                return;
            }

            $channels = collect(array_keys($response->json('result.channels')))
                ->map(function ($name) {
                    return $name;
                })
                ->filter(function ($name) use ($event) {
                    if (!Str::startsWith($name, 'flarum:#')) {
                        return;
                    }

                    $userId = Str::after($name, 'flarum:#');

                    if ($userId == $event->actor->id) {
                        return;
                    }

                    /**
                     * @var ?User
                     */
                    $user = User::find($userId);

                    if (is_null($user)) {
                        return;
                    }

                    if (!$event->post->isVisibleTo($user)) {
                        return;
                    }

                    return $name;
                })
                ->all();

            $this->client->broadcast($channels, array_merge([
                'type' => 'discussions'
            ], $payload));
        }
    }
}
