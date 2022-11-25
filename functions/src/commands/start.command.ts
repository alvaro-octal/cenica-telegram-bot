import { AbstractCommand } from './abstract.command';
import { Context } from 'telegraf';

export class StartCommand extends AbstractCommand {
    async invoke(ctx: Context): Promise<void> {
        ctx.reply('Hello world');
    }

    readonly name: string = 'start';
}
