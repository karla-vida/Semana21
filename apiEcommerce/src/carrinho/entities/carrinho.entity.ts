import { ProductEntity } from './../../produtos/entities/produto.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";

// +-------------+--------------+----------------------------+
// |                        carrinho                         |
// +-------------+--------------+----------------------------+
// | id_usuario  | uuid         | PRIMARY KEY                |
// | valor       | decimal      |                            |
// | id_produto  | int          |  FK                        |
// +-------------+--------------+----------------------------+

@Entity({ name: "carrinho" })
export class CarrinhoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;


    @Column({ length: 100 })
    valor: number;
    
    // @Column()
    @ManyToOne(() => ProductEntity, (ProductEntity) => ProductEntity.id, { cascade: false })
    @JoinColumn({ name: 'id' })
    id_produto: number;

}