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

  passILike(obj) {
    const aux = { ...obj };
    Object.keys(obj).forEach((key, index) => {
      aux[key] = ILike(`%${obj[key]}%`);
    });
    console.log('-- aux --');
    console.log(aux);
    return aux;
  }
  
  async findItensCarrinho(buscarProduto: BuscarProdutosCarrinhoDTO): Promise<CarrinhoEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (buscarProduto) {
          resolve(await this.carrinhoRepository.findBy({id_carrinho: buscarProduto.id_carrinho}));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

}
