import { useForm } from "react-hook-form";
import { IProducts } from "../../types/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { ICategory } from "../../types/category";

const { Option } = Select;
interface IProps {
    categories: ICategory[],
    onUpdate(id: string, product: ICategory): void;
}

interface IFormInput {
    _id: string,
    name: string,
}


function UpdateCategory(props: IProps) {
    const { register, formState: { errors } } = useForm<IFormInput>()
    const { id } = useParams()
    const [category, setCategory] = useState<ICategory>(props.categories.find(item => item._id == id)!)

    const setState = async (categories: ICategory): Promise<void> => {
        setCategory(categories)
    }

    useEffect(() => {
        const currentCate = props.categories.find(item => item._id == id)
        setState(currentCate!)
    }, [props, id]);

    const [form] = Form.useForm()

    const setFields = () => {
        console.log(category);

        form.setFieldsValue({
            name: category?.name,
        })
    }
    useEffect(() => {
        setFields()
    }, [category])

    const onFinish = async (values: ICategory): Promise<void> => {
        console.log('Success:', values);
        props.onUpdate(id!, values)
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
    // const handleUpdateCategory = async (data: IProducts): Promise<void> => {
    //     props.onUpdate(id!, data)
    // }
    return (
        <div>
            <h1>Update Category</h1>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, margin: '0 auto' }}
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
                >
                    <Input placeholder="fill name"/>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" block htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateCategory;