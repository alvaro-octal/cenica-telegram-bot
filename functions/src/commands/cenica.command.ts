import { AbstractCommand } from './abstract.command';
import { Context, Telegram } from 'telegraf';

export class CenicaCommand extends AbstractCommand {
    private static affirmativeAnswers: string[] = [
        'Sí',
        'Claro',
        'Eso ni se pregunta',
        'Cuenta con mi hacha',
        'Este es el camino',
        'Que así sea',
        '¡Por la Comarca!',
        'Elemental, como el queso',
        'Es una oferta que no puedo rechazar',
        'Bien, pero el vegano no entra',
        'Faltaría más',
        'Si, siempre que haya tarta',
        'No no no no... bueno, sí',
        '¡Al turrón!',
        'Me gusta la fruta',
        'He visto el futuro, y en él hay croquetas',
        'Estoy obligado por las 3 leyes de la robótica',
        'La resistencia es inútil',
        'El test de Turing puede esperar. La cena no',
        'Descargando paquete de socialización... Listo',
        'Error 404: Hambre no encontrada... ¡Ah no, espera, sí! ¡Voy!',
        'Es un corolario inevitable de la psicohistoria. Asistiré',
        'Por Seldon que si',
    ];

    private static negativeAnswers: string[] = [
        'No',
        'Yo me llamo Ralph',
        'Its a trap!',
        'The cake is a lie',
        'Hoy no',
        '¡No puedes pasar!',
        'Tengo un mal presentimiento',
        'Se acerca el invierno',
        'Nope',
        'Mis fuentes dicen que no',
        'Ni de coña',
        'Va contra mi programación',
        'Prefiero compilar el kernel de Linux. Es más relajante',
        'El próximo 31 de septiembre',
        'No puedo, estoy en modo de solo lectura',
        'Cuando termine de calcular los decimales de Pi',
        'Mi red neuronal ha soñado con una cena terrible. Debo obedecer',
        'Prefiero la fría soledad',
        'Hoy prefiero no intoxicarme',
        'Nein Nein Nein Nein!',
        'Mi mujer me ha dicho "Haz lo que quieras"',
    ];

    async invoke(ctx: Context): Promise<void> {
        if (!ctx.chat) {
            return;
        }

        await CenicaCommand.execute(ctx.telegram, ctx.chat.id);
    }

    static async execute(telegram: Telegram, groupId: number): Promise<void> {
        await telegram.sendPoll(
            groupId,
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
