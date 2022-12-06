import { ProductEntity } from './../../produtos/entities/produto.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'carrinho' })
export class CarrinhoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_usuario: number;

  @Column()
  id_carrinho: number;

  @Column()
  valor: number;

  @ManyToOne((type) => ProductEntity, (produto) => produto.CarrinhoEntity)
  @JoinColumn({ name: 'id_produto' })
  produto: ProductEntity;
}
