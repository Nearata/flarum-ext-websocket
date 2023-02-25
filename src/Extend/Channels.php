<?php

namespace Nearata\Websocket\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class Channels implements ExtenderInterface
{
    protected $channels = [];

    public function add(string $name): self
    {
        $this->channels[] = $name;

        return $this;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        $container->extend('centrifugo.channels', function (array $channels) {
            return array_merge($channels, $this->channels);
        });
    }
}
