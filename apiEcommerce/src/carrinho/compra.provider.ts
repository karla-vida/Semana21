import { DataSource } from 'typeorm';
import { CompraEntity } from './entities/compra.entity';

export const compraProviders = [
  {
    provide: 'COMPRA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CompraEntity),
    inject: ['DATA_SOURCE'],
  },
];
