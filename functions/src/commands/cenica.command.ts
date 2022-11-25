import { AbstractCommand } from './abstract.command';
import { Context, Telegram } from 'telegraf';
import { config } from 'firebase-functions';

export class CenicaCommand extends AbstractCommand {
    private static affirmativeAnswers: string[] = [
        'Sí',
        'Claro',
        'Eso ni se pregunta',
        'Perfecto',
        'Venga va',
        'Vale',
        'Bien',
        'Por mi bien',
        'Soy un buque',
        'Cuenta con mi hacha',
    ];

    private static negativeAnswers: string[] = [
        'No',
        'Nope',
        'Va a ser que no',
        'Negativo',
        'Otro dia mejor',
        'Hoy imposible',
        'Bueno... no :(',
        'Yo me llamo Ralph',
        'Ni en mil años',
        'Antes muerto',
    ];

    async invoke(ctx: Context): Promise<void> {
        if (ctx?.message?.from?.id !== Number(config().telegram.owner)) {
            await ctx.reply('Unauthorized');
            return;
        }

        await this.execute(ctx.telegram);
    }

    public async execute(telegram: Telegram): Promise<void> {
        await telegram.sendPoll(
            Number(config().telegram.group),
            'Bueno que, hoy cenica?',
            [
                CenicaCommand.randomElement(CenicaCommand.affirmativeAnswers),
                CenicaCommand.randomElement(CenicaCommand.negativeAnswers),
            ],
            {
                is_anonymous: false,
            },
        );
    }

    private static randomElement<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    readonly name: string = 'cenica';
}
