import { CarrinhoEntity } from './../../carrinho/entities/carrinho.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriaProduto } from '../utils/CategoriaProduto.enum';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  code: string;

  @Column('int')
  category: CategoriaProduto;

  @Column('float')
  price: number;

  @Column('int')
  stock: number;

  @OneToMany(() => CarrinhoEntity, (carrinho) => carrinho.produto)
  @JoinColumn()
  CarrinhoEntity?: CarrinhoEntity[];
}
