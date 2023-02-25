<?php

namespace Nearata\Websocket\Post\Listener;

use Flarum\Post\Event\Posted;
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
        $this->client->publish('flarum:discussions', [
            'postId' => $event->post->id,
            'discussionId' => $event->post->discussion->id
        ]);
    }
}
