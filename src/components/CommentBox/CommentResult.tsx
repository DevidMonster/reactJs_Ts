import { useEffect, useState } from "react";
import { IComments } from "../../types/comment";
import { ConfigProvider, List } from "antd";
import { SmileOutlined } from "@ant-design/icons";

interface IProps {
    comments?: IComments[],
}
const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      <p>Not comment yet</p>
    </div>
  );
function CommentResult(props: IProps) {
    const [currentComment, setCurrentComment] = useState(props.comments)
    const [customize, setCustomize] = useState(true);
    useEffect(() => {
        setCurrentComment(props.comments)
    }, [props])
    console.log(props.comments);

    return (
        <div>
            <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
            <List
                dataSource={currentComment}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                footer={
                    <div>
                        <b>add comment</b>
                    </div>
                }
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                    >
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item?.userName}</a>}
                            description={item?.subject}
                        />
                        {item?.content}
                    </List.Item>
                )}
            />
            </ConfigProvider>
        </div>
    );
}

export default CommentResult;