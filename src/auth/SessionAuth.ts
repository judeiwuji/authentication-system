import ParticipatingWebsite from '../models/ParticipatingWebsite';
import Session, { SessionCreationAttributes } from '../models/Session';
import User from '../models/User';
import UserSecret from '../models/UserSecret';
import { SessionNotFoundError } from '../models/errors/SessionError';
import Auth from './Auth';

export default class SessionAuth extends Auth {
  async createSession(data: SessionCreationAttributes) {
    return Session.create(data);
  }

  async findUserBySession(sessionId: string) {
    const session = await Session.findByPk(sessionId, {
      include: [{ model: User, include: [UserSecret, ParticipatingWebsite] }],
    });

    if (!session) {
      throw new SessionNotFoundError('Not found');
    }
    return session.user;
  }

  async logout(sessionId: string) {
    const session = await Session.findByPk(sessionId, {
      include: [{ model: User, include: [UserSecret] }],
    });

    if (!session) {
      throw new SessionNotFoundError('Not found');
    }

    await session.destroy();
  }
}
