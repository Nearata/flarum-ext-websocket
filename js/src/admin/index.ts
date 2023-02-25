import app from "flarum/admin/app";

app.initializers.add("nearata-websocket", () => {
  app.extensionData
    .for("nearata-websocket")
    .registerSetting({
      setting: "nearata-websocket.hmac-key",
      type: "password",
      label: app.translator.trans(
        "nearata-websocket.admin.settings.token_hmac_secret_key"
      ),
      help: app.translator.trans(
        "nearata-websocket.admin.settings.token_hmac_secret_key_help"
      ),
    })
    .registerSetting({
      setting: "nearata-websocket.api-key",
      type: "password",
      label: app.translator.trans("nearata-websocket.admin.settings.api_key"),
      help: app.translator.trans(
        "nearata-websocket.admin.settings.api_key_help"
      ),
    })
    .registerSetting({
      setting: "nearata-websocket.websocket-url",
      type: "text",
      label: app.translator.trans(
        "nearata-websocket.admin.settings.websocket_url"
      ),
      help: app.translator.trans(
        "nearata-websocket.admin.settings.websocket_url_help"
      ),
    })
    .registerSetting({
      setting: "nearata-websocket.api-url",
      type: "text",
      label: app.translator.trans("nearata-websocket.admin.settings.api_url"),
      help: app.translator.trans(
        "nearata-websocket.admin.settings.api_url_help"
      ),
    })
    .registerSetting({
      setting: "nearata-websocket.jwt-exp",
      type: "number",
      label: app.translator.trans("nearata-websocket.admin.settings.jwt_exp"),
      help: app.translator.trans(
        "nearata-websocket.admin.settings.jwt_exp_help"
      ),
    });
});
