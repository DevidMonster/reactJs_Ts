import { IComments } from "../../types/comment";
import instance from "../instance";
import { message } from "antd";

// const getAllProduct = async (): Promise<IComments[]> => {
//     const data = await instance.get("/products?_expand")

//     return data.data.data
// }

// const getDetailProduct = async (id: string): Promise<IComments> => {
//     const data = await instance.get("/products/" + id).catch(res => message.error(res.response.data.message))
//     return data!.data.data[0]
// }

const postComment = async (cmt: IComments): Promise<IComments> => {
    const data = await instance.post("/comments", cmt).catch(res => message.error(res.response.data.message))
    return data!.data.comment

}

// const patchProduct = async (id: string, item: IProducts): Promise<IProducts> => {
//     const data = await instance.put("/products/" + id, item).catch(res => message.error(res.response.data.message))
//     console.log(data!.data.data);
//     return data!.data.data
// }

// const deleteProduct = async (id: string): Promise<void> => {
//     await instance.delete("/products/" + id).catch(res => message.error(res.response.data.message))
// }

const cmtRequest = {
    postComment
}

export default cmtRequest 