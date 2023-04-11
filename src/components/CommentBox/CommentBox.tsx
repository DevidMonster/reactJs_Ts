import { Button, Form, Input } from "antd";
import CommentResult from "./CommentResult";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
import cmtRequest from "../../api/httpRequest/comment";
import { IComments } from "../../types/comment";


interface IProps {
    id: string;
    currentCmt: string[] | IComments[];
}

        
const socket = io("ws://localhost:3001");
function CommentBox(props: IProps) {
    const { id } = props;
    console.log(props.currentCmt);
    
    const [mess, setMess] = useState<any>(props?.currentCmt);
    const [idM, setIdM] = useState<any>();
console.log(mess);

    useEffect(() => {
      
        socket.on('getId', data => {
            setIdM(data)
        }) // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.
    
        // socket.on('sendDataServer', dataGot => {
        //     setMess((oldMsgs: any) => [...oldMsgs, dataGot.data])
        // }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 
    
        return () => {
            socket.disconnect();
        };
    }, []);

    const onFinish = async (values: any): Promise<void> => {
        console.log('Success:', values);
        const msg = {
            id: idM,
            userId: (JSON.parse(localStorage.getItem('user')!))._id,
            productId: id,
            userName: values.userName,
            subject: values.subject,
            content: values.content,
        }
        socket.emit('sendDataClient', msg)
        cmtRequest.postComment(msg).then(data => {
            console.log(data);
            
            setMess(prev => [...prev, data])
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm()

    const setFields = () => {

        form.setFieldsValue({
            userName: JSON.parse(localStorage.getItem('user')!).name,
        })
    }
    useEffect(() => {
        setFields()
        setMess(props?.currentCmt)
    }, [props])
    return (  
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '20px' }}>
            <h1>Feedback</h1>
            <CommentResult comments={mess}/>
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
                form={form}
            >
                <Form.Item
                    label="UserName"
                    name="userName"
                    rules={[{ required: true }]}
                    normalize={value => value.trim()}
                    hasFeedback
                >
                    <Input placeholder="fill name"/>
                </Form.Item>
                <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true }]}
                    normalize={value => value.trim()}
                    hasFeedback
                >
                    <Input placeholder="fill subject"/>
                </Form.Item>
                <Form.Item
                    label="Content"
                    name='content'
                    rules={[{ required: true, message: `bạn phải nhập content` },
                    {
                        min: 20,
                        message: "Textarea length must be at least 20 characters",
                    },]}
                    normalize={value => value.trim()}
                >
                    <TextArea
                        showCount
                        maxLength={500}
                        style={{ height: 120 }}
                        placeholder="content"
                    />
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

export default CommentBox;