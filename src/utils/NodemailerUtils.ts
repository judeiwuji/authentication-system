import { Transporter, createTransport } from "nodemailer";
import * as dotenv from "dotenv";
import * as Mail from "nodemailer/lib/mailer";
dotenv.config();

export default class NodemailerUtils {
  private smtp!: Transporter;

  constructor() {
    this.smtp = createTransport({
      service: "aol",
      secure: false,
      auth: {
        user: process.env["MAIL_USER"],
        pass: process.env["MAIL_PASS"],
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(options: Mail.Options) {
    options.from = `${process.env["MAIL_USER"]}`;
    try {
      await this.smtp.sendMail(options);
      return true;
    } catch (error) {
      console.debug(error);
      throw new Error("Unable to send mail");
    }
  }
}
