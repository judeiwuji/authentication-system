import AppConfig from '../config/appConfig';
import User from '../models/User';
import JWTUtil from '../utils/JWTUtil';
import NodemailerUtils from '../utils/NodemailerUtils';
import crypto from 'crypto';

export default class VerificationService {
  async sendCode(user: User, code: number) {
    const mailer = new NodemailerUtils();
    console.log(`\nCode: ${code}\n`);
    try {
      await mailer.send({
        html: `
      <h1 style="font-weight: 700; font-size: 1.5rem">${AppConfig.appName}</h1>
      <br>
      <br>
      <p>Hi <strong>${user.firstname}</strong>, your verification code is:</p>
      <h1 style="text-align: center">${code}</h1>
      <br/>
      <p>
        <strong>Note:</strong>
        This verification code will expire after 10 minutes it was generated.
      </p>
      `,
        to: user.email,
        subject: `${AppConfig.appName} Verification Code`,
      });
    } catch (error) {
      console.debug(error);
    }
  }

  generateCode() {
    return crypto.randomInt(0, 1000000);
  }

  generateToken(email: string, code: number) {
    return JWTUtil.sign({
      payload: { email, code },
      expiresIn: process.env.VERIFICATION_CODE_EXPIRE,
    });
  }
}
