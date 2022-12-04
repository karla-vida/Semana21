import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { carrinhoProviders } from './carrinho.provider';
import { CarrinhoController } from './controllers/carrinho.controller';
import { CarrinhoService } from './service/carrinho.service';


@Module({
  controllers: [CarrinhoController],
  providers: [
    ...databaseProviders,
    ...carrinhoProviders,
    CarrinhoService
  ]
})
export class CarrinhoModule {}