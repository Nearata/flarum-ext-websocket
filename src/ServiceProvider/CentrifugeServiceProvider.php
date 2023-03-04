<?php

namespace Nearata\Websocket\ServiceProvider;

use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Http\Client\Factory;

class CentrifugeServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        /** @var \Flarum\Settings\SettingsRepositoryInterface */
        $settings = $this->container->make('flarum.settings');

        $apiUrl = $settings->get('nearata-websocket.api-url');
        $apiKey = $settings->get('nearata-websocket.api-key');

        Factory::macro('centrifugo', function () use ($apiUrl, $apiKey) {
            return (new Factory())
                ->withToken($apiKey, 'apikey')
                ->baseUrl($apiUrl)
                ->asJson();
        });

        $this->container->singleton('centrifugo.channels', function () {
            return [
                'discussions'
            ];
        });
    }
}
