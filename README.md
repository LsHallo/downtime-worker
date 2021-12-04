# Downtime Worker

Sends Telegram message when webhook with header `X-Auth: [WEB_AUTH]` is received.  
Uses `X-Service-Name`, `X-Event` and `X-Tags` for more info.  
- `X-Service-Name`: Friendly name of service. E.g.: 'Server'  
- `X-Event`: What ever string you like your event to be. E.g.: 'Up', 'Down'  
- `X-Tags`: Custom tags  

The message has the following format:
```
The check [X-Service-Name] has gone [X-Event]!

Tags: [X-Tags]
```

### Healthchecks
Intended to be used with [healthchecks](https://github.com/healthchecks/healthchecks) webhooks. Configure like this:
![webhook config](misc/healthchecks-webhook.png)


___
### Running
You can deploy directly:  
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/LsHallo/downtime-worker)

When running locally you'll need to install wrangler `npm i -g @cloudflare/wrangler`  
And then log in with your cloudflare account: `wrangler login`


___
### Set secrets (Environment variables)
Run `wrangler secret put [name]` for each.  
`WEB_AUTH`: Free form token to authorize webhook. Is use a long (>128) base64 key.  
`TELEGRAM_BOT_KEY`: Key from Telegram BothFather. E.g.: `49548951621:a6087sofdzulaisjd_ASDaz789sdgup`  
`TELEGRAM_CHAT_ID`: id of your personal chat with the bot.  
_You can get the key by creating a chat with your bot (Follow BotFather instruction for how-to).
And then query `https://api.telegram.org/bot[key]/getUpdates`_


___
### Running Dev Version
*Probably need to set `CF_ACCOUNT_ID` env variable when using more than one account.*  
<details>
  <summary>Instructions</summary>
  
  ### Windows
  ```powershell
  setx CF_ACCOUNT_ID <account_id>
  ```
  **You may need to restart you IDE for changes to take effect**
    
  ### Unix
  ```bash
  export CF_ACCOUNT_ID=<account_id>
  ```
  **You may need to restart you IDE for changes to take effect**
</details>

Then run ```wrangler dev```


___
### Publish
**Local**  
`wrangler publish`  

**GitHub Actions**  
Set [secrets](../../settings/secrets/actions):  
`CF_ACCOUNT_ID`: Your cloudflare account id  
`CF_API_TOKEN`: Cloudflare api token with at leastworker access rights


___
#### Logs
`wrangler tail`