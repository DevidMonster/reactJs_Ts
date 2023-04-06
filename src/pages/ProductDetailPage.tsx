import { useParams } from "react-router-dom";
import { IProducts } from "../types/products";

interface IProps {
    products: IProducts[]
}

function ProductDetailPage(props: IProps) {
    const { id } = useParams()
    const currentItem = props.products.find(item => item._id === id)
    return (
        <div>
            <h1>Product Detail</h1>
            <img src={currentItem?.image} alt={currentItem?.name} />
            <h2>{currentItem?.name}</h2>
            <h3>{currentItem?.price}</h3>
            <p>{currentItem?.description}</p>
        </div>
    );
}

export default ProductDetailPage;