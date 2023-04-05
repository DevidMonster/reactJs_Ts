import { useForm } from "react-hook-form";
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
    const { register, formState: { errors } } = useForm<IFormInput>()
    const { id } = useParams()
    const [product, setProduct] = useState<IProducts>(props.products.find(item => item._id == id)!)
    const [categories, setCategories] = useState<ICategory[]>([])


    const setState = async (products: IProducts): Promise<void> => {
        const res = await categoryRequest.getAllCategory()
        setCategories(res)
        setProduct(products)
    }

    useEffect(() => {
        const currentProduct = props.products.find(item => item._id == id)
        setState(currentProduct!)
    }, [props, id]);

    const [form] = Form.useForm()

    const setFields = () => {
        console.log(product);

        form.setFieldsValue({
            name: product?.name,
            price: product?.price,
            description: product?.description,
            categories: product?.categories.map((cate) => cate?._id)
        })
    }
    useEffect(() => {
        setFields()
    }, [product])

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
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: '0 auto' }}
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
                            <Option key={cate._id} value={cate._id}>{cate.name}</Option>
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