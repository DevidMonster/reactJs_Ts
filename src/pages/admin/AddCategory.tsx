import { useForm, SubmitHandler } from "react-hook-form";
import { IProducts } from "../../types/products";
import { Upload, message } from 'antd';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/category";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface IProps {
    onAddCate(category: ICategory): void;
}

interface IFormInput {
    _id: string,
    name: string,
}

function AddCategory(props: IProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const onFinish = async (values: ICategory): Promise<void> => {
        props.onAddCate(values)
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
    return (
        <div>
            <h1>Add Category</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="UserName"
                    {...register('name')}
                    rules={[{ required: true }]}
                    validateStatus={errors.name ? "error" : ""}
                    normalize={value => value.trim()}
                >
                    <Input placeholder="fill name"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCategory;