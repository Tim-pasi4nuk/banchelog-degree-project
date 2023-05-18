import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config';
import { AppException } from '../exceptions/app.exception';
import { LoggerService } from '../loggers';
import { FindManyOptions, Repository } from 'typeorm';
import { IGetDataWithPagination } from './types';

@Injectable()
export class UtilsService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _logger: LoggerService,
  ) {}

  public handleError(err: any, errorPrefix: string): void {
    if (err.name === 'AxiosError') {
      const appName = this._appConfig.appName;
      const errorStatus = err.response?.status || 500;
      const errorMessage =
        err.response?.data?.message || err.response?.message || err.message;
      const errorCode =
        err.response?.data?.code ||
        err.response?.code ||
        err.code ||
        '[UNKNOWN_ERROR]';
      const serviceStack = `${
        err.response?.data?.data?.serviceStack ||
        err.response?.data?.serviceStack ||
        ''
      } [${appName}][${errorPrefix}]${
        err.response?.data?.serviceStack || err.response?.serviceStack || ''
      }`;

      throw new AppException(errorStatus, errorCode, errorMessage, {
        serviceStack,
      });
    }

    const appName = this._appConfig.appName;
    const errorStatus = err.status || 500;
    const errorMessage = err.response?.message || err.message;
    const errorCode = err.response?.code || err.code;
    const serviceStack = `[${appName}][${errorPrefix}]${
      err.response?.data?.serviceStack || err.response?.serviceStack || ''
    }`;

    this._logger.error(errorMessage, err.trace || err);

    throw new AppException(errorStatus, errorCode, errorMessage, {
      serviceStack,
    });
  }

  public getNumberDay(startDate: Date, endDate: Date) {
    return Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );
  }

  public async getDataWithPagination<E>(
    entityManager: Repository<E>,
    params: IGetDataWithPagination<E>,
  ) {
    const limit = +params.size || this._appConfig.defaultBatchSize;
    const page = +params.page || 1;
    const skip = (page - 1) * limit;
    const take = page * limit;

    const options: FindManyOptions<E> = {
      take,
      skip,
    };

    if (params.where) {
      options.where = params.where;
    }

    if (params.relations) {
      options.relations = params.relations;
    }

    if (params.order) {
      options.order = params.order;
    }

    const [data, total] = await entityManager.findAndCount(options);

    return {
      data,
      page,
      pagesAmount: Math.ceil(total / limit),
      limit: take,
      total,
    };
  }
}
