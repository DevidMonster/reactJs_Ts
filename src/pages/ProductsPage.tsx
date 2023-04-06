import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IProducts } from '../types/products';
import { Button, Image, Card } from 'antd';

const { Meta } = Card;
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
                    <Card
                        key={item._id}
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src={item?.image} />}
                    >
                        <h1>{item?.name}</h1>
                        <Meta title={item?.price + "VNĐ"} description={item?.description} />
                        <br />
                        <Button onClick={() => navigate("/products/" + item?._id)}>View</Button>
                    </Card>
                ))}
                {/* <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src={item?.image} alt={item?.name} style={{ height: "300px", width: "100%" }} />
                        </div>
                        <h1>{item?.name}</h1>
                        <h3>{item?.price}</h3>
                        <p>{item?.description}</p> */}
            </div>
        </div>
    )
}

export default ProductPage;