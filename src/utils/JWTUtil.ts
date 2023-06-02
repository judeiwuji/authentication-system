import { SignOptions, decode, sign, verify } from "jsonwebtoken";

export default class JWTUtil {
  static sign(options: {
    payload: any;
    expiresIn?: string;
    secret?: string;
    issuer?: string;
  }) {
    const secret = (options.secret || process.env["JWT_SECRET"]) as string;
    const issuer = options.issuer || process.env["JWT_ISSUER"];
    const config: SignOptions = { issuer };

    if (options.expiresIn) {
      config.expiresIn = options.expiresIn;
    }
    return sign(options.payload, secret, config);
  }

  static verify(options: {
    token: string;
    secret?: string;
    issuer?: string;
  }): any {
    const secret = (options.secret || process.env["JWT_SECRET"]) as string;
    const issuer = options.issuer || process.env["JWT_ISSUER"];

    return verify(options.token, secret, { issuer, complete: true }).payload;
  }

  static decode(token: string) {
    return decode(token, { complete: true, json: true });
  }
}
