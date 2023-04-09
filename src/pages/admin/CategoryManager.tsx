import { Table, Space, Button, Tag, Image, Input, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../types/category";

interface IProps {
    data: ICategory[],
    onRemoveCate(id: string): void
}
interface ICategoryKey extends ICategory {
    key?: string
}

function CategoryManager(props: IProps) {
    const { data, onRemoveCate } = props
    const [currentData, setCurrentData] = useState<ICategoryKey[]>(data)
    const [searchValue, setSearchValue] = useState<string>("")

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length
        },
        {
            title: 'Products',
            key: 'products',
            render: (_: any, record: any) => (
                <Space wrap size="middle">
                    {record.products.map((prd: any) => (
                        <Tag>{prd.name}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="text" danger><Link to={"/admin/categories/update/" + record._id}>Update</Link></Button>
                    <Popconfirm
                        title="Delete the Category"
                        description="Are you sure to delete this category?"
                        onConfirm={(e: any) => confirm(e, record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const confirm = (e: React.MouseEvent<HTMLElement>, id: string) => {
        console.log(e);
        onRemoveCate(id)
    };
      
    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        message.error('Denined');
    };

    const handleSearch = (e: any) => {
        setSearchValue(e.target.value);
        const filterSearch = data.filter(item => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setCurrentData(filterSearch);
    }

    useEffect(() => {
        const newArr: ICategoryKey[] = data?.map(cate => {
            let item: ICategoryKey = { ...cate, key: cate._id }
            return item
        })
        setCurrentData(newArr)
    }, [data])

    return (
        <div className="products">
            <h1>Categories Manager</h1>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Input.Search
                    allowClear
                    enterButton="Search"
                    size="large"
                    width={200}
                    placeholder="Search Product by Name"
                    value={searchValue}
                    onChange={handleSearch}
                    style={{ margin: '20px 0', width: '30%' }}
                />
            </div>
            <Table
                pagination={{
                    pageSize: 10
                }}
                dataSource={currentData}
                columns={columns}
            />
        </div>
    );
}

export default CategoryManager;