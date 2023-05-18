import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';

export interface IGetDataWithPagination<E> {
  page?: string | number;
  size?: string | number;
  where?: FindOptionsWhere<E>;
  relations?: FindOptionsRelations<E>;
  order?: FindOptionsOrder<E>;
}
