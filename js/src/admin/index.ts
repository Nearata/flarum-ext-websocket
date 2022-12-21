import app from 'flarum/admin/app';

app.initializers.add('nearata/websocket', () => {
  app.extensionData
    .for('nearata-websocket')
    .registerSetting({
      setting: 'nearata-websocket.api-key',
      type: 'password',
      label: app.translator.trans('nearata-websocket.admin.api_key'),
    })
    .registerSetting({
      setting: 'nearata-websocket.hmac-key',
      type: 'password',
      label: app.translator.trans('nearata-websocket.admin.token_hmac_secret_key'),
    })
    .registerSetting({
      setting: 'nearata-websocket.websocket-url',
      type: 'text',
      label: app.translator.trans('nearata-websocket.admin.websocket_url'),
    })
    .registerSetting({
      setting: 'nearata-websocket.api-url',
      type: 'text',
      label: app.translator.trans('nearata-websocket.admin.api_url'),
    });
});
