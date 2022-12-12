import app from 'flarum/admin/app';

app.initializers.add('nearata/websocket', () => {
  console.log('[nearata/websocket] Hello, admin!');
});
