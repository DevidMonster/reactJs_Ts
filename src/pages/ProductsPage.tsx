import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IProducts } from '../types/products';
import { Button, Image } from 'antd';
interface IProps {
    products: IProducts[]
}

function ProductPage(props: IProps) {
    const { products } = props
    const [data, setData] = useState<IProducts[]>(products)
    useEffect(() => {
        setData(products)

    }, [products])
    const navigate = useNavigate()
    return (
        <div className="Product">
            <h1>Products Page</h1>
            <div style={{ display: 'flex', justifyContent: "space-around", gap: "20px" }}>
                {data.map(item => (
                    <div key={Number(item?._id)} style={{ width: "25%", height: "500px", border: "1px solid grey", borderRadius: "10px", padding: "10px" }}>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src={item?.image} alt={item?.name} style={{ height: "300px", width: "100%" }} />
                        </div>
                        <h1>{item?.name}</h1>
                        <h3>{item?.price}</h3>
                        <p>{item?.description}</p>
                        <Button style={{ marginRight: "10px" }} onClick={() => navigate("/products/" + item?._id)}>View</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPage;