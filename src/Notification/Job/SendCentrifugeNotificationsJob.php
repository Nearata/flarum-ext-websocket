<?php

namespace Nearata\Websocket\Notification\Job;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Queue\AbstractJob;
use Flarum\User\User;

class SendCentrifugeNotificationsJob extends AbstractJob
{
    /**
     * @var BlueprintInterface
     */
    private $blueprint;

    /**
     * @var User[]
     */
    private $recipients;

    public function __construct(BlueprintInterface $blueprint, array $recipients)
    {
        $this->blueprint = $blueprint;
        $this->recipients = $recipients;
    }

    public function handle()
    {
        foreach ($this->recipients as $user) {
            if ($user->shouldAlert($this->blueprint::getType())) {
                // TODO
            }
        }
    }
}
