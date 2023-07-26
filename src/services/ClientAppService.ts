import ClientApp, {
  ClientAppAttributes,
  ClientAppCreationAttributes,
} from '../models/ClientApp';
import ParticipatingWebsite from '../models/ParticipatingWebsite';
import Pagination from '../models/Pagination';
import {
  ClientAppAlreadyExistsError,
  ClientAppError,
  ClientAppNotFoundError,
} from '../models/errors/ClientAppError';
import NotFoundError from '../models/errors/NotFoundError';

export default class ClientAppService {
  async createApp(
    data: ClientAppCreationAttributes,
    developer: ParticipatingWebsite
  ) {
    try {
      const appExists = await ClientApp.findOne({ where: { name: data.name } });

      if (appExists) {
        throw new ClientAppAlreadyExistsError('App already exists');
      }

      return ClientApp.create({
        developerId: developer.id,
        name: data.name,
        redirectURL: data.redirectURL,
      });
    } catch (error) {
      throw new ClientAppError('Failed to create app');
    }
  }

  async updateApp(data: ClientAppAttributes, id: string) {
    const [affectedCount] = await ClientApp.update(
      {
        redirectURL: data.redirectURL,
      },
      { where: { id } }
    );
    return affectedCount > 0;
  }

  async getApps(page = 1, developer: ParticipatingWebsite) {
    const pager = new Pagination(page);
    const { rows, count } = await ClientApp.findAndCountAll({
      where: { developerId: developer.id },
      limit: pager.pageSize,
      offset: pager.startIndex,
    });

    return {
      results: rows.map((d) => d.toJSON()),
      totalPages: pager.totalPages(count, pager.pageSize),
      page,
    };
  }

  async findAppBy(query: any) {
    const app = await ClientApp.findOne({
      where: query,
    });

    if (!app) {
      throw new NotFoundError('App not found');
    }
    return app;
  }

  async deleteApp(id: string, developer: ParticipatingWebsite) {
    const app = await ClientApp.findOne({
      where: {
        id,
        developerId: developer.id,
      },
    });

    if (!app) {
      throw new ClientAppNotFoundError('App not found');
    }
    await app.destroy();
    return true;
  }
}
