<?php

namespace Nearata\Websocket\Post\Listener;

use Flarum\Post\Event\Posted;
use Flarum\User\Guest;
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
        }
    }
}
