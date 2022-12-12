import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompraEntity } from './compra.entity';

@Entity({ name: 'endereco' })
export class EnderecoEntity {
  @PrimaryGeneratedColumn()
  id_endereco: number;

  @Column()
  rua: string;

  @Column()
  numero: number;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  cep: string;

  @OneToOne(() => CompraEntity, (compra) => compra.endereco)
  compra: CompraEntity;
}
