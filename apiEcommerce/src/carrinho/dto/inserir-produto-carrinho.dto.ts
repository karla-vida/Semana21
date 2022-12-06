import { ProductEntity } from './../../produtos/entities/produto.entity';

export class InserirProdutoCarrinhoDTO {
  readonly produto: ProductEntity;

  readonly id_usuario: number;

  readonly valor: number;

  readonly id_carrinho: number;
}
