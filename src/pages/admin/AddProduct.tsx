import { useForm, SubmitHandler } from "react-hook-form";
import { IProducts } from "../../types/products";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import categoryRequest from "../../api/httpRequest/category";
import { ICategory } from "../../types/category";

const { Option } = Select;

interface IProps {
    onAdd(product: IProducts): void;
}

interface IFormInput {
    _id: string;
    name: string;
    price: number;
    description?: string;
}

function AddProduct(props: IProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const [categories, setCategories] = useState<ICategory[]>([])


    // const handleAddProduct: SubmitHandler<IFormInput> = async (data: IProducts): Promise<void> => {
    //     console.log(data, errors);

    //     props.onAdd(data)
    // }
    const getCate = async (): Promise<void> => {
        const res = await categoryRequest.getAllCategory()
        setCategories(res)
    }
    useEffect(() => {
        getCate()
    }, [])
    const onFinish = async (values: IProducts): Promise<void> => {
        props.onAdd(values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log(errors);
    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be larger than ${min}',
        },
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: '0 auto' }}
            initialValues={{ remember: true }}
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

export default AddProduct;