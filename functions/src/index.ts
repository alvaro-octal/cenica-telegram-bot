import { Context, Telegraf } from 'telegraf';
import { logger } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import { AbstractCommand } from './commands/abstract.command';
import { CenicaCommand } from './commands/cenica.command';
import { StartCommand } from './commands/start.command';
import { onSchedule } from 'firebase-functions/scheduler';
import { defineInt, defineString } from 'firebase-functions/params';
import { IdCommand } from './commands/id.command';

let bot: Telegraf;

function init(): Telegraf {
    if (bot) {
        return bot;
    }

    bot = new Telegraf(defineString('TELEGRAM_TOKEN').value(), {
        telegram: {
            webhookReply: true,
        },
    });

    bot.catch(async (err, ctx: Context): Promise<void> => {
        logger.error('[Bot] Error', err);
        await ctx.reply(`Encountered an error for ${ctx.updateType}`);
    });

    return bot;
}

export const webhook = onRequest({ region: 'europe-west6' }, async (req, res) => {
    const bot: Telegraf = init();

    const commands: AbstractCommand[] = [new StartCommand(), new CenicaCommand(), new IdCommand()];

    for (const command of commands) {
        bot.command(command.name, (ctx: Context): Promise<void> => command.invoke(ctx));
    }

    await bot.handleUpdate(req.body, res);
});

export const scheduledFunctionCrontab = onSchedule(
    {
        schedule: '0 10 * * 6',
        timeZone: 'Europe/Madrid',
        region: 'europe-west6',
    },
    async () => {
        const bot: Telegraf = init();

        await CenicaCommand.execute(bot.telegram, defineInt('TELEGRAM_GROUP_ID').value());
    },
);
