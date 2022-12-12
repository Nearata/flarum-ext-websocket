import app from 'flarum/forum/app';

app.initializers.add('nearata/websocket', () => {
  console.log('[nearata/websocket] Hello, forum!');
});
