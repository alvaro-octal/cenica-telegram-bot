# Cenica Telegram Bot

## Deploy

```sh
firebase deploy --only functions
```

## Set Webhook

```sh
curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=<FIREBASE_URL>
```
