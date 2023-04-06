import { useForm, SubmitHandler } from "react-hook-form";
import { IProducts } from "../../types/products";
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import categoryRequest from "../../api/httpRequest/category";
import { ICategory } from "../../types/category";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface IProps {
    onAdd(product: IProducts): void;
}

interface IFormInput {
    _id: string,
    name: string,
    price: number,
    image: string,
    description?: string,
}

function AddProduct(props: IProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
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
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const getCate = async (): Promise<void> => {
        const res = await categoryRequest.getAllCategory()
        setCategories(res)
    }
    useEffect(() => {
        getCate()
    }, [])

    const onFinish = async (values: IProducts): Promise<void> => {
        const url = values.image
        props.onAdd({ ...values, image: url[0].thumbUrl })
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
        <div>
            <h1>Add Product</h1>
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
                    label="Image"
                    valuePropName="fileList"
                    {...register('image')}
                    rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                    validateStatus={errors.image ? "error" : ""}
                >

                    <Upload
                        name="image" beforeUpload={handleBeforeUpload} customRequest={dummyRequest} listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

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

export default AddProduct;