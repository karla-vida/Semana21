import { BuscarProdutosCarrinhoDTO } from './../dto/buscar-produtos-carrinho.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { InserirProdutoCarrinhoDTO } from '../dto/inserir-produto-carrinho.dto';
import { CarrinhoEntity } from '../entities/carrinho.entity';
import { CarrinhoService } from '../service/carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private carrinhoService: CarrinhoService) {}

  @Post()
  async criar(
    @Body() inserirProdutoCarrinho: InserirProdutoCarrinhoDTO,
  ): Promise<CarrinhoEntity> {
    try {
      return await this.carrinhoService.insert(inserirProdutoCarrinho);
    } catch (err) {
      if (err.code == 23505)
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id_carrinho')
  async obterProdutosCarrinho (@Param() buscarProduto: BuscarProdutosCarrinhoDTO): Promise<CarrinhoEntity[]>  {
    try {
      return await this.carrinhoService.findItensCarrinho(buscarProduto);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
