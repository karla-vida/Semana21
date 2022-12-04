import { Controller } from "@nestjs/common";
import { CarrinhoService } from "../service/carrinho.service";


@Controller('carrinho')
export class CarrinhoController {
  constructor(private carrinhoService: CarrinhoService) { }
}