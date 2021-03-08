import React from "react";
import { Card, Avatar } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
export default function Post({post}) {
    const { caption, photo, location } = post;
    return (
        <div>
            <Card hoverable cover={<img src={photo} alt={caption} />} actions={[<HeartFilled />]}>
                <Card.Meta avatar={<Avatar size="large" icon={<UserOutlined />}/>} title={location} description={caption} />
            </Card>
            {/* <img src={photo} alt={caption} style={{ width: "100px"}}/> */}
        </div>
    )
}


