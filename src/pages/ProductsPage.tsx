import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IProducts } from '../types/products';
import { Button, Segmented, Card, Pagination } from 'antd';
import { ICategory } from '../types/category';

const { Meta } = Card;
interface IProps {
    products: IProducts[],
    categories: ICategory[],
    onChangeCate: (id: string) => void
}

function ProductPage(props: IProps) {
    const { products, categories } = props
    const [options, setOptions] = useState<any>([])
    const [data, setData] = useState<IProducts[]>(products)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 4
    });

    useEffect(() => {
        const endOffset = pagination.current * pagination.pageSize;
        const firstOffset = endOffset - pagination.pageSize
        const currentItems = products.slice(firstOffset, endOffset)
        setData(currentItems)
    }, [pagination])

    useEffect(() => {
        const ot = categories?.map(cate => ({
            label: cate?.name,
            value: cate?._id
        }))
        console.log(ot);
        
        if(ot?.length > 0) {
            setOptions(ot)
        }
        const endOffset = 1 * pagination.pageSize;
        const firstOffset = endOffset - pagination.pageSize
        const currentItems = products.slice(firstOffset, endOffset)
        setPagination({
            current: 1,
            pageSize: 4
        })
        setData(currentItems)
    }, [products])

    const navigate = useNavigate()
    const handleGetItemByCate = (value: any) => {       
        return props.onChangeCate(value)
    } 

    const handlePageChange = (page: any, pageSize: any) => {
        console.log(page, pageSize);
        
        setPagination({ ...pagination, current: page, pageSize: 4 });
    };
    return (
        <div className="Product">
            <h1>Products Page</h1>
            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', padding: '20px 0'}}>
                <Segmented
                    options={[{ label: 'All' }, ...options]}
                    onChange={handleGetItemByCate}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: "space-around", gap: "20px" }}>
                {data.map(item => (
                    <Card
                        key={item._id}
                        hoverable
                        title={item?.name}
                        extra={<Button onClick={() => navigate("/products/" + item?._id)}>View</Button>}
                        style={{ width: 300 }}
                        cover={<img alt="example" src={item?.image} />}
                    >
                        <Meta title={item?.price + "VNĐ"} description={item?.description} />
                    </Card>
                ))}
                {/* <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src={item?.image} alt={item?.name} style={{ height: "300px", width: "100%" }} />
                        </div>
                        <h1>{item?.name}</h1>
                        <h3>{item?.price}</h3>
                        <p>{item?.description}</p> */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0'}}>
                <Pagination
                    {...pagination}
                    total={products.length}
                    showQuickJumper
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default ProductPage;