import { TProduct } from "../types/product.type";

export const getStock=(product:TProduct, size:string | null) =>{

    const sizeStock = product.sizeStok.find(item => item.size === size);
    return sizeStock ? sizeStock.stock : 0;
}