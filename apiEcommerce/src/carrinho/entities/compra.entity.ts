import { EnderecoEntity } from './endereco.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { PagamentoEntity } from './pagamento.entity';

@Entity({ name: 'compra' })
export class CompraEntity {
  @PrimaryColumn()
  id_compra: number;

  @Column()
  nome: string;

  @OneToOne(() => EnderecoEntity, (endereco) => endereco.compra, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id_endereco' })
  endereco: EnderecoEntity;

  @OneToOne(() => PagamentoEntity, (pagamento) => pagamento.compra, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id_pagamento' })
  pagamento: PagamentoEntity;

  @Column()
  id_carrinho: number;
}
