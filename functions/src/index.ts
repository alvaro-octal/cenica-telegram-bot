import { Context, Telegraf } from 'telegraf';
import { Request, logger, config, https, Response, pubsub } from 'firebase-functions';
import { AbstractCommand } from './commands/abstract.command';
import { CenicaCommand } from './commands/cenica.command';
import { StartCommand } from './commands/start.command';

const bot = new Telegraf(config().telegram.token, {
    telegram: {
        webhookReply: true,
    },
});

bot.catch(async (err, ctx: Context): Promise<void> => {
    logger.error('[Bot] Error', err);
    await ctx.reply(`Encountered an error for ${ctx.updateType}`);
});

const commands: AbstractCommand[] = [new StartCommand(), new CenicaCommand()];

for (const command of commands) {
    bot.command(`/${command.name}`, (ctx: Context) => command.invoke(ctx));
}

exports.webhook = https.onRequest(async (request: Request, response: Response): Promise<void> => {
    logger.log('Incoming message', request.body);
    await bot.handleUpdate(request.body, response).then(() => {
        return response.sendStatus(200);
    });
});

exports.scheduledFunctionCrontab = pubsub
    .schedule('0 10 * * 6')
    .timeZone('Europe/Madrid')
    .onRun((): void => {
        const cenica: CenicaCommand = new CenicaCommand();
        cenica.execute(bot.telegram);
    });
