import { AbstractCommand } from './abstract.command';
import { Context } from 'telegraf';

export class StartCommand extends AbstractCommand {
    async invoke(ctx: Context): Promise<void> {
        await ctx.reply('Hello world');
    }

    readonly name: string = 'start';
}
