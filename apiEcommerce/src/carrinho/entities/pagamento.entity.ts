import { CompraEntity } from './compra.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pagamento' })
export class PagamentoEntity {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @Column()
  cartao: number;

  @Column()
  nome: string;

  @Column()
  vencimento: number;

  @Column()
  cvv: number;

  @OneToOne(() => CompraEntity, (compra) => compra.pagamento)
  compra: CompraEntity;
}
