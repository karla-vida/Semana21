import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FinalizarCompraDTO } from '../dto/finalizar-compra.dto';
import { CompraEntity } from '../entities/compra.entity';

@Injectable()
export class CompraService {
  constructor(
    @Inject('COMPRA_REPOSITORY')
    private compraRepository: Repository<CompraEntity>,
  ) {}

  async insert(compra: FinalizarCompraDTO): Promise<CompraEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.compraRepository.create(compra.compra);
        console.log('id endereco' + response.endereco.id_endereco);
        const created: CompraEntity = await this.compraRepository.save(
          response,
        );
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
}
