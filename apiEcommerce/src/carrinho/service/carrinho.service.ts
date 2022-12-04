import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CarrinhoEntity } from "../entities/carrinho.entity";


@Injectable()
export class CarrinhoService {
  constructor(
    @Inject('CARRINHO_REPOSITORY')
    private carrinhoRepository: Repository<CarrinhoEntity>
  ) { }
}