<?php

namespace Nearata\Websocket;

use Flarum\Extend;
use Flarum\Post\Event\Posted;
use Nearata\Websocket\Api\Controller\RefreshMainTokenController;
use Nearata\Websocket\Api\Controller\RefreshTokenController;
use Nearata\Websocket\Notification\Driver\CentrifugeNotificationDriver;
use Nearata\Websocket\Post\Listener\PostedListener;
use Nearata\Websocket\ServiceProvider\CentrifugeServiceProvider;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings)
        ->default('nearata-websocket.jwt-exp', 60)
        ->serializeToForum('nearataWebsocketUrl', 'nearata-websocket.websocket-url'),

    (new Extend\ServiceProvider)
        ->register(CentrifugeServiceProvider::class),

    (new Extend\Routes('api'))
        // ->post('/nearata/websocket/expireToken', 'nearata-websocket.expire-token', ExpireTokenController::class)
        ->post('/nearata/websocket/refreshMainToken', 'nearata-websocket.refresh-main-token', RefreshMainTokenController::class)
        ->post('/nearata/websocket/refreshChannelToken', 'nearata-websocket.refresh-channel-token', RefreshTokenController::class),

    (new Extend\Event)
        ->listen(Posted::class, PostedListener::class),

    (new Extend\Notification())
        ->driver('websocket', CentrifugeNotificationDriver::class),

    (new Extend\ErrorHandling)
        ->status('http_bad_request', 400)
];
