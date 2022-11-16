# firebase-telegram-bot

## Deploy

```sh
firebase functions:config:set telegram.token="<TOKEN>"
firebase deploy --only functions
```

## Set Webhook

```sh
curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=<FIREBASE_URL>
```


