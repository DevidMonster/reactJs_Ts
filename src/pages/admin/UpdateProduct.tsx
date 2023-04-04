import { useForm, SubmitHandler } from "react-hook-form";
import { IProducts } from "../../types/products";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface IProps {
    products: IProducts[],
    onUpdate(id: string, product: IProducts): void;
}

interface IFormInput {
    _id: string;
    name: string;
    price: number;
    description?: string;
}

function UpdateProduct(props: IProps) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const { id } = useParams()
    useEffect(() => {
        const currentProduct = props.products.find(item => item._id == id)
        reset(currentProduct)
    }, [props])
    const handleUpdateProduct: SubmitHandler<IFormInput> = async (data: IProducts): Promise<void> => {
        props.onUpdate(id!, data)
    }
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" {...register('name', { required: true })} placeholder="Enter Name" />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" {...register('price', { required: true })} placeholder="Enter Price" />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea cols={30} rows={10} {...register('description', { required: true })} placeholder="Enter Description"></textarea>
            </div>
            <button>Update</button>
        </form>
    );
}

export default UpdateProduct;