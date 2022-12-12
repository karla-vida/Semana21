import { CompraService } from './service/compra.service';
import { CompraController } from './controllers/compra.controller';
import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { carrinhoProviders } from './carrinho.provider';
import { CarrinhoController } from './controllers/carrinho.controller';
import { CarrinhoService } from './service/carrinho.service';
import { compraProviders } from './compra.provider';

@Module({
  controllers: [CarrinhoController, CompraController],
  providers: [
    ...databaseProviders,
    ...carrinhoProviders,
    ...compraProviders,
    CarrinhoService,
    CompraService,
  ],
})
export class CarrinhoModule {}
