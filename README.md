# firebase-telegram-bot

## Deploy

```sh
firebase functions:config:set telegram.token="<TOKEN>"
firebase functions:config:set telegram.owner="<OWNER>"
firebase functions:config:set telegram.group="<GROUP>"
firebase deploy --only functions
```

## Set Webhook

```sh
curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=<FIREBASE_URL>
```
