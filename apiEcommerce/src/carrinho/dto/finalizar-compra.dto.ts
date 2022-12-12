import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CompraEntity } from './../entities/compra.entity';

export class FinalizarCompraDTO {
  @Type(() => CompraEntity)
  @ValidateNested()
  readonly compra: CompraEntity;
}
