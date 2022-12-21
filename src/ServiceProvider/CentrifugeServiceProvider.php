<?php

namespace Nearata\Websocket\ServiceProvider;

use Flarum\Foundation\AbstractServiceProvider;

class CentrifugeServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        /** @var \Flarum\Settings\SettingsRepositoryInterface */
        $settings = $this->container->make('flarum.settings');

        $apiUrl = $settings->get('nearata-websocket.api-url');
        $apiKey = $settings->get('nearata-websocket.api-key');
        $key = $settings->get('nearata-websocket.hmac-key');

        $this->container->singleton('centrifugo', function () use ($apiUrl, $apiKey, $key) {
            return new \phpcent\Client($apiUrl, $apiKey, $key);
        });
    }
}
