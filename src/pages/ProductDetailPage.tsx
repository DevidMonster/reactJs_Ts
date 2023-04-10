import { Link, useNavigate, useParams } from "react-router-dom";
import { IProducts } from "../types/products";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Button, Card, Image, Layout, Typography  } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import categoryRequest from "../api/httpRequest/category";
import { useEffect, useState } from "react";
import CommentBox from "../components/CommentBox/CommentBox";

const { Title } = Typography

interface IProps {
    products: IProducts[]
}

function ProductDetailPage(props: IProps) {
    const { id } = useParams()
    const [relatedItems, setRelatedItems] = useState<IProducts[]>([])
    const currentItem = props.products.find(item => item._id === id)
    const navigate = useNavigate()
    useEffect(() => {
        currentItem?.categories?.forEach(async (cate) => {
            await categoryRequest.getDetailCategory(cate._id, "?_embed").then(({products}: any) => {    
                setRelatedItems(products.slice(0, 8))
            })
        })
    }, [id, currentItem])
    
    console.log(relatedItems);
    

    return (
        <div>
            <h1>Product Detail</h1>
            <Layout
                style={{
                    padding: '0 50px',
                    margin: '0 auto'
                }}
            >  
                <Sider width={400} style={{ background: "#fff", height: "400px" }}>
                    <Image src={currentItem?.image} alt={currentItem?.name} width={"100%"} height={"100%"}/>
                </Sider>
                <Content style={{ 
                    padding: "0 24px 24px",
                    overflow: "auto"
                }}>
                    <Title level={3}>Name:</Title>
                    <h1>{currentItem?.name}</h1>
                    <Title level={3}>Price:</Title>
                    <h2>{currentItem?.price + "VNĐ"}</h2>
                    <Title level={3}>Description:</Title>
                    <p>{currentItem?.description}</p>
                    <Button size="large" icon={<ShoppingCartOutlined />}>Add to cart</Button>
                </Content>                        
            </Layout>
            <div>
                <h1>Comment</h1>
                {localStorage.getItem("token") ? (
                    <CommentBox currentCmt={currentItem?.comments} id={id!}/>
                ) : (
                    <button><Link to={"/login"}>Login</Link></button>
                )} 
            </div>
            <h1>Related Products</h1>
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                        padding: '30px',
                    }}
                >
                    {relatedItems?.map(prd => (
                        <Card
                            key={prd._id}
                            hoverable
                            title={prd?.name}
                            extra={<Button onClick={() => navigate("/products/" + prd?._id)}>View</Button>}
                            style={{ width: 300 }}
                            cover={<img alt="example" src={prd?.image} />}
                        >
                            <Card.Meta title={prd?.price + "VNĐ"} description={prd?.description} />
                        </Card>
                    ))}
                </div>
            </Layout>
        </div>
    );
}

export default ProductDetailPage;