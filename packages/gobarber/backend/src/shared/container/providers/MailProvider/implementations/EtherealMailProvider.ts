import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../interfaces/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount((_, account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.combr>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(`Preview email: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
