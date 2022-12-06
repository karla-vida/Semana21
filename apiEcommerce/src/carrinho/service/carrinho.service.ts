import { RemoverItemCarrinhoDTO } from './../dto/remover-item-carrinho.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BuscarProdutosCarrinhoDTO } from '../dto/buscar-produtos-carrinho.dto';
import { InserirProdutoCarrinhoDTO } from '../dto/inserir-produto-carrinho.dto';
import { CarrinhoEntity } from '../entities/carrinho.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @Inject('CARRINHO_REPOSITORY')
    private carrinhoRepository: Repository<CarrinhoEntity>,
  ) {}

  async insert(carrinho: InserirProdutoCarrinhoDTO): Promise<CarrinhoEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.carrinhoRepository.insert(carrinho);
        const { id } = response.generatedMaps[0];
        let created = new CarrinhoEntity();
        created = { ...carrinho, id: id };
        resolve(created);
      } catch (error) {
        console.log('-- insert error --');
        console.log(error);
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
  
  async findItensCarrinho(buscarProduto: BuscarProdutosCarrinhoDTO, removerItem: RemoverItemCarrinhoDTO): Promise<CarrinhoEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (buscarProduto) {
          resolve(await this.carrinhoRepository.findBy({id_carrinho: buscarProduto.id_carrinho}));
        }
        if (removerItem) {
          resolve(await this.carrinhoRepository.findBy({id_carrinho: removerItem.id_carrinho}));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.carrinhoRepository.delete({ id: id });
        if (affected === 0) {
          reject({
            code: 20000,
            detail:
              'Este ID não está presente no banco de dados ou não foi possível remover.',
          });
        }
        resolve(true);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });

}
}
