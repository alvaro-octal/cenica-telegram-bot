import { AbstractCommand } from './abstract.command';
import { Context } from 'telegraf';

export class IdCommand extends AbstractCommand {
    async invoke(ctx: Context): Promise<void> {
        const user: string = ctx.from?.id?.toString() ?? 'Unknown';
        const chat: string = ctx.chat?.id?.toString() ?? 'Unknown';

        await ctx.reply(`Hello ${user} from ${chat}`);
    }

    readonly name: string = 'id';
}
