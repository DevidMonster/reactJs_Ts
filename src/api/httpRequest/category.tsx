import { ICategory } from "../../types/category"
import instance from "../instance"

const getAllCategory = async (): Promise<ICategory[]> => {
    const data = await instance.get("/categories")
    return data.data.data
}

const getDetailCategory = async (id: string): Promise<ICategory> => {
    const data = await instance.get("/categories/" + id).catch(res => alert(res.response.data.message))
    return data!.data.data[0]
}

const postCategory = async (item: ICategory): Promise<ICategory> => {
    const data = await instance.post("/categories", item).catch(res => alert(res.response.data.message))
    return data!.data.data

}

const patchCategory = async (id: string, item: ICategory): Promise<ICategory> => {
    const data = await instance.put("/categories/" + id, item).catch(res => alert(res.response.data.message))
    console.log(data!.data.data);
    return data!.data.data
}

const deleteCategory = async (id: string): Promise<void> => {
    await instance.delete("/categories/" + id).catch(res => alert(res.response.data.message))
}

const categoryRequest = {
    getAllCategory, getDetailCategory, postCategory, patchCategory, deleteCategory
}

export default categoryRequest 