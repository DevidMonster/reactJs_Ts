import { useForm } from "react-hook-form";
import { IProducts } from "../../types/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { ICategory } from "../../types/category";
import categoryRequest from "../../api/httpRequest/category";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
interface IProps {
    products: IProducts[],
    onUpdate(id: string, product: IProducts): void;
}

interface IFormInput {
    _id: string,
    name: string,
    price: number,
    image: string,
    description?: string,
}


function UpdateProduct(props: IProps) {
    const { register, formState: { errors } } = useForm<IFormInput>()
    const { id } = useParams()
    const [product, setProduct] = useState<IProducts>(props.products.find(item => item._id == id)!)
    const [categories, setCategories] = useState<ICategory[]>([])


    const dummyRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const handleBeforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt2M;
    };

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
        let url = product.image
        console.log('Success:', values);

        if (values.image !== undefined) url = values.image[0].thumbUrl
        props.onUpdate(id!, { ...values, image: url })
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
        <div>
            <h1>Update Product</h1>
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
                    label="Image"
                    valuePropName="fileList"
                    {...register('image')}
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                >
                    <Upload
                        name="image" beforeUpload={handleBeforeUpload} customRequest={dummyRequest} listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>+ Upload</Button>
                    </Upload>

                </Form.Item>
                <Form.Item
                    label="Current Image"
                >
                    <Image src={product?.image} alt={product?.name} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    {...register('description')}
                    rules={[{ required: true, message: `bạn phải nhập description` },
                    {
                        min: 32,
                        message: "Textarea length must be at least 32 characters",
                    },]}
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
        </div>
    );
}

export default UpdateProduct;