import { Table, Space, Button, Tag, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProducts } from "../../types/products";

interface IProps {
    data: IProducts[],
    onRemove(id: string): void
}
interface IProductKey extends IProducts {
    key?: string
}

function ProductsManager(props: IProps) {
    const { data, onRemove } = props
    const [currentData, setCurrentData] = useState<IProductKey[]>(data)
    const [searchValue, setSearchValue] = useState<string>("")

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (imageUrl: string) => <Image src={imageUrl} alt="image" />
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a: any, b: any) => a.price - b.price,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Categories',
            key: 'categories',
            render: (_: any, record: any) => (
                <Space size="middle">
                    {record.categories.map((cate: any) => (
                        <Tag>{cate.name}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button danger><Link to={"/products/" + record._id}>View</Link></Button>
                    <Button type="text" danger><Link to={"/admin/products/update/" + record._id}>Update</Link></Button>
                    <Button type="primary" danger onClick={() => onRemove(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleSearch = (e: any) => {
        setSearchValue(e.target.value);
        const filterSearch = data.filter(item => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setCurrentData(filterSearch);
    }

    useEffect(() => {
        const newArr: IProductKey[] = data?.map(product => {
            let item: IProductKey = { ...product, key: product._id }
            return item
        })
        setCurrentData(newArr)
    }, [data])

    return (
        <div className="products">
            <h1>Products Manager</h1>
            <Input.Search
                allowClear
                enterButton="Search"
                size="large"
                placeholder="Search Product by Name"
                value={searchValue}
                onChange={handleSearch}
                style={{ margin: '20px 0' }}
            />
            <Table dataSource={currentData} columns={columns} />
            {/* <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => onRemove(item.id)}>Delete</button>
                                <button>
                                    <Link to={"/admin/edit_product/" + item.id}>Edit</Link>
                                </button>
                                <button>
                                    <Link to={"/products/" + item.id}>View</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default ProductsManager;