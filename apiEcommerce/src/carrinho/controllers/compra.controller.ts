import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FinalizarCompraDTO } from '../dto/finalizar-compra.dto';
import { CompraEntity } from '../entities/compra.entity';
import { CompraService } from '../service/compra.service';

@Controller('compra')
export class CompraController {
  constructor(private compraService: CompraService) {}

  @Post()
  async criar(
    @Body() finalizarCompra: FinalizarCompraDTO,
  ): Promise<CompraEntity> {
    try {
      return await this.compraService.insert(finalizarCompra);
    } catch (err) {
      if (err.code == 23505)
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }
}
