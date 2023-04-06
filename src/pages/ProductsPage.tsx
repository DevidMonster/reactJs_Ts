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
            <div style={{ display: 'flex', justifyContent: "space-around", gap: "20px" }}>
                {data.map(item => (
                    <div key={Number(item?._id)} style={{ width: "25%", height: "500px", border: "1px solid grey", borderRadius: "10px", padding: "10px" }}>
                        <img src={item?.image} alt={item?.name} style={{ height: "300px", width: "100%" }} />
                        <h1>{item?.name}</h1>
                        <h3>{item?.price}</h3>
                        <p>{item?.description}</p>
                        <button onClick={() => navigate("/products/" + item?._id)}>View</button>
                        <button onClick={() => onRemove(item?._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPage;