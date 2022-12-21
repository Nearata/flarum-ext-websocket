<?php

namespace Nearata\Websocket\Post\Listener;

use Flarum\Post\Event\Posted;

class PostedListener
{
    public function handle(Posted $event)
    {
        $json = [
            'postId' => $event->post->id,
            'discussionId' => $event->post->discussion->id
        ];

        /** @var \phpcent\Client */
        $centrifugo = resolve('centrifugo');

        $centrifugo->publish('flarum:discussions', $json);
    }
}
