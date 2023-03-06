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
        if ($event->post->isVisibleTo(new Guest())) {
            $this->client->publish('flarum:discussions', [
                'postId' => $event->post->id,
                'discussionId' => $event->post->discussion->id
            ]);
        } else {
            $response = $this->client->getChannels();

            if (!$response->successful()) {
                return;
            }

            if (!is_null($response->json('error'))) {
                return;
            }

            $channels = $response->json('result.channels');

            foreach ($channels as $name => $channel) {
                // we need personal channels
                if (!Str::startsWith($name, 'flarum:#')) {
                    continue;
                }

                $userId = Str::after($name, 'flarum:#');

                if ($userId == $event->actor->id) {
                    continue;
                }

                /**
                 * @var ?User
                 */
                $user = User::find($userId);

                if (is_null($user)) {
                    continue;
                }

                if ($event->post->isVisibleTo($user)) {
                    $this->client->publish($name, [
                        'postId' => $event->post->id,
                        'discussionId' => $event->post->discussion->id,
                        'type' => 'discussions'
                    ]);
                }
            }
        }
    }
}
