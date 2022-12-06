import { BuscarProdutosCarrinhoDTO } from './../dto/buscar-produtos-carrinho.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { InserirProdutoCarrinhoDTO } from '../dto/inserir-produto-carrinho.dto';
import { CarrinhoEntity } from '../entities/carrinho.entity';
import { CarrinhoService } from '../service/carrinho.service';
import { RemoverItemCarrinhoDTO } from '../dto/remover-item-carrinho.dto';

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
  async obterProdutosCarrinho(
    @Param() buscarProduto: BuscarProdutosCarrinhoDTO,
  ): Promise<CarrinhoEntity[]> {
    try {
      return await this.carrinhoService.findItensCarrinho(buscarProduto, null);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id_carrinho/:produto')
  async removerItemCarrinho(
    @Param() removerItem: RemoverItemCarrinhoDTO,
  ): Promise<CarrinhoEntity[]> {
    console.log(removerItem.id_carrinho);
    console.log(removerItem.produto);

    try {
      const listaItensCarrinhos = await this.carrinhoService.findItensCarrinho(
        null,
        removerItem,
      );
      console.log(listaItensCarrinhos.length);

      const achado = listaItensCarrinhos.filter(
        (carrinho) => carrinho.produto.id == removerItem.produto
      );
      console.log(achado.length);
      const novaLista = listaItensCarrinhos.filter(
        (carrinho) => carrinho.produto.id != removerItem.produto,
      );
      console.log(novaLista.length);
      await this.carrinhoService.delete(achado[0].id);

      return novaLista;
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
