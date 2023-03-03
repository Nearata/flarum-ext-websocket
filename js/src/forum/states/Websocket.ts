import app from "flarum/forum/app";

export default class Websocket {
  channels: any;

  constructor() {
    this.channels = {};
  }

  init() {
    const wsUrl = app.forum.attribute("nearataWebsocketUrl");

    const centrifuge = new Centrifuge(wsUrl, {
      getToken: async function () {
        const url = app.forum.attribute("apiUrl");

        return await app
          .request({
            url: `${url}/nearata/websocket/refreshMainToken`,
            method: "POST",
          })
          .then((res: any) => {
            return res["token"];
          })
          .catch(() => {
            return "";
          });
      },
    });

    centrifuge.connect();

    this.channels["main"] = centrifuge;
  }

  subscribeChannel(channel: string) {
    if (channel in this.channels) {
      return this.channels[channel];
    }

    const sub = this.channels.main.newSubscription(`flarum:${channel}`, {
      getToken: async function () {
        const url = app.forum.attribute("apiUrl");

        return await app
          .request({
            url: `${url}/nearata/websocket/refreshChannelToken`,
            method: "POST",
            body: { channel },
          })
          .then((res: any) => {
            return res["token"];
          })
          .catch(() => {
            return "";
          });
      },
    });

    sub.subscribe();

    this.channels[channel] = sub;

    return sub;
  }

  getChannel(channel: string) {
    if (!(channel in this.channels)) {
      return null;
    }

    return this.channels[channel];
  }
}
