import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
export default function Post({post}) {
    const { author, caption, photo, location, tag_set, like_user_set } = post;
    const { username, name, avatar_url } = author;
    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo}
                alt={caption} />}
                actions={[<HeartOutlined />]}
            >
                <Card.Meta
                    avatar={<Avatar size="large" icon={<img src={`http://localhost:8000` + avatar_url} alt={username} />} />}
                    title={location}
                    description={caption}
                />
            </Card>
            {/* <img src={photo} alt={caption} style={{ width: "100px"}}/> */}
        </div>
    )
}


