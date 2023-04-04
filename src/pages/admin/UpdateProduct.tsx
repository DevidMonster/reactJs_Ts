import { useForm, SubmitHandler } from "react-hook-form";
import { IProducts } from "../../types/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { ICategory } from "../../types/category";
import categoryRequest from "../../api/httpRequest/category";

const { Option } = Select;
interface IProps {
    products: IProducts[],
    onUpdate(id: string, product: IProducts): void;
}

interface IFormInput {
    _id: string;
    name: string;
    price: number;
    description?: string;
}


function UpdateProduct(props: IProps) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const [currentCate, setCurrentCate] = useState<ICategory[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [currentData, setCurrentData] = useState<IProducts>({})

    const { id } = useParams()

    const getCate = async (): Promise<void> => {
        const res = await categoryRequest.getAllCategory()
        const prdId = res.filter(res => {
            for(const prd of res.products) {
                if(prd?._id == id) return res
            }
        })
        console.log(prdId);
        
        setCurrentCate(prdId)
        setCategories(res)
    }
    
    useEffect(() => {
        const currentProduct = props.products.find(item => item._id == id)
        setCurrentData(currentProduct!)
        getCate()
    }, [props,id])

    console.log(currentData);
    
    const onFinish = async (values: IProducts): Promise<void> => {
        props.onUpdate(id!, values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be larger than ${min}',
        },
    };
    // const handleUpdateProduct = async (data: IProducts): Promise<void> => {
    //     props.onUpdate(id!, data)
    // }
    console.log(errors);
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: '0 auto' }}
            initialValues={{ 
                name: currentData?.name,
                categories: currentCate
             }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Form.Item
                label="UserName"
                {...register('name')}
                rules={[{ required: true }]}
                validateStatus={errors.name ? "error" : ""}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                {...register('price')}
                rules={[{ type: 'number', min: 0, required: true, message: `bạn phải nhập price` }]}
                validateStatus={errors.price ? "error" : ""}
            >
                <InputNumber />

            </Form.Item>
            <Form.Item
                label="Description"
                {...register('description')}
                rules={[{ required: true, message: `bạn phải nhập description` }]}
                validateStatus={errors.description ? "error" : ""}
            >
                <TextArea
                    showCount
                    maxLength={500}
                    style={{ height: 120, resize: 'none' }}
                    placeholder="description"
                />
            </Form.Item>
            {/* 
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}
            <Form.Item
                name="categories"
                label="Select[category]"
                rules={[{ required: true, message: 'Please select catefories', type: 'array' }]}
            >
            <Select mode="multiple" placeholder="Please select categories">
                {
                    categories?.map(cate => (
                        <Option value={cate._id}>{cate.name}</Option>
                    ))
                }
            </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdateProduct;