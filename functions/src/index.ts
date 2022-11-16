import { Context, Telegraf } from 'telegraf';

import { Request, logger, config, https, Response } from 'firebase-functions';

console.log({
    config: config(),
});

const bot = new Telegraf(config().telegram.token, {
    telegram: {
        webhookReply: true,
    },
});

// error handling
bot.catch(async (err, ctx: Context): Promise<void> => {
    logger.error('[Bot] Error', err);
    await ctx.reply(`Encountered an error for ${ctx.updateType}`);
});

// initialize the commands
bot.command('/start', (ctx: Context) => ctx.reply('Hello! Send any message and I will copy it.'));
// copy every message and send to the user
bot.on('message', (ctx: Context) => {
    if (!ctx.chat) {
        throw new Error('No chat provided');
    } else if (!ctx.message) {
        throw new Error('No message provided');
    }

    return ctx.telegram.copyMessage(ctx.chat.id, ctx.chat.id, ctx.message.message_id);
});

// handle all telegram updates with HTTPs trigger
exports.echoBot = https.onRequest(async (request: Request, response: Response): Promise<void> => {
    logger.log('Incoming message', request.body);
    await bot.handleUpdate(request.body, response).then(() => {
        return response.sendStatus(200);
    });
});
