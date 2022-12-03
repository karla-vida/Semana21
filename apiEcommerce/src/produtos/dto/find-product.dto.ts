import { CategoriaProduto } from "../utils/CategoriaProduto.enum";
export class FindProductDTO {
    readonly id: string;
    // name: string;
    // code: string;
    readonly category: CategoriaProduto;
    // stock: number;   
}