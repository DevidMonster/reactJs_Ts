import { useParams } from "react-router-dom";
import { IProducts } from "../types/products";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Image, Layout } from "antd";

interface IProps {
    products: IProducts[]
}

function ProductDetailPage(props: IProps) {
    const { id } = useParams()
    const currentItem = props.products.find(item => item._id === id)
    return (
        <div>
            <h1>Product Detail</h1>
            <Layout>  
                <Sider width={400} style={{ background: "#fff", height: "400px" }}>
                    <Image src={currentItem?.image} alt={currentItem?.name} width={"100%"} height={"100%"}/>
                </Sider>
                <Content style={{ 
                    padding: "0 24px 24px",
                    overflow: "auto"
                }}>
                    <h1>{currentItem?.name}</h1>
                    <h2>{currentItem?.price + "VNĐ"}</h2>
                    <p>{currentItem?.description}</p>
                </Content>                        
            </Layout>
        </div>
    );
}

export default ProductDetailPage;