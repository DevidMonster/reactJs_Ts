import { IProducts } from "../../types/products";
import instance from "../instance";

const getAllProduct = async (): Promise<IProducts[]> => {
    const data = await instance.get("/products")

    return data.data.data.docs
}

const getDetailProduct = async (id: string): Promise<IProducts> => {
    const data = await instance.get("/products/" + id).catch(res => alert(res.response.data.message))
    return data!.data.data[0]
}

const postProduct = async (item: IProducts): Promise<IProducts> => {
    const data = await instance.post("/products", item).catch(res => alert(res.response.data.message))
    return data!.data.data

}

const patchProduct = async (id: string, item: IProducts): Promise<IProducts> => {
    const data = await instance.put("/products/" + id, item).catch(res => alert(res.response.data.message))
    console.log(data!.data.data);
    return data!.data.data
}

const deleteProduct = async (id: string): Promise<void> => {
    await instance.delete("/products/" + id).catch(res => alert(res.response.data.message))
}

const productRequest = {
    getAllProduct, getDetailProduct, postProduct, patchProduct, deleteProduct
}

export default productRequest 