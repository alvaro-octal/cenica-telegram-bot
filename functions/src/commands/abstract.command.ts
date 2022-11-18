import { Context } from 'telegraf';

export abstract class AbstractCommand {
    abstract readonly name: string;
    abstract invoke(ctx: Context): Promise<void>;
}
