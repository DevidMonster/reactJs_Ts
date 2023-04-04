import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IProducts } from '../types/products';
interface IProps {
    products: IProducts[],
    onRemove(id: string): void
}

function ProductPage(props: IProps) {
    const { products, onRemove } = props
    const [data, setData] = useState<IProducts[]>(products)
    useEffect(() => {
        setData(products)

    }, [products])
    const navigate = useNavigate()
    console.log(data);
    return (
        <div className="Product">
            <h1>Products Page</h1>
            {data.map(item => (
                <div key={Number(item?._id)}>
                    <h1>{item?.name}</h1>
                    <h3>{item?.price}</h3>
                    <p>{item?.description}</p>
                    <button onClick={() => navigate("/products/" + item?._id)}>View</button>
                    <button onClick={() => onRemove(item?._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default ProductPage;