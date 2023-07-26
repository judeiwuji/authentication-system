import { genSalt, hash } from 'bcryptjs';
import ParticipatingWebsite, {
  ParticipatingWebsiteAttributes,
  ParticipatingWebsiteCreationAttributes,
} from '../models/ParticipatingWebsite';
import User, { UserAttributes, UserCreationAttributes } from '../models/User';
import DB from '../models/engine/DBStorage';
import { DeveloperCreateError } from '../models/errors/Developer';

export default class DeveloperService {
  async createDeveloper(
    data: UserCreationAttributes & ParticipatingWebsiteCreationAttributes
  ) {
    const transaction = await DB.transaction();

    try {
      const salt = await genSalt(12);
      const hashedPassword = await hash(data.password, salt);
      const { id } = await User.create(
        {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          password: hashedPassword,
        },
        { transaction }
      );
      const developer = await ParticipatingWebsite.create(
        {
          company: data.company,
          role: data.role,
          userId: id,
        },
        { transaction }
      );
      await transaction.commit();
      return (await ParticipatingWebsite.findByPk(developer.id, {
        include: [User],
      })) as ParticipatingWebsite;
    } catch (error: any) {
      await transaction.rollback();
      throw new DeveloperCreateError(error.message);
    }
  }

  async updateDeveloper(
    data: UserAttributes & ParticipatingWebsiteAttributes,
    user: User
  ) {
    const [userCount] = await User.update(
      {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      { where: { id: user.id } }
    );
    const [developerCount] = await ParticipatingWebsite.update(
      { company: data.company, role: data.role },
      { where: { userId: user.id } }
    );

    return userCount + developerCount > 0;
  }
}
