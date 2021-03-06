import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "Post"

const apiUrl = "http://localhost:8000/api/posts/"

export default function PostList() {
    const [postList, setPostList] = useState([]);
    // 컴퍼넌트가 생성된 후 호출 -> 훅
    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                console.log("loaded reponse :", response);
                setPostList(data)
            })
            .catch(error => {
                // error.response;
            })
        console.log("mounted")
    }, []);

    return (
        <div>
            <h1>PsotList</h1>
            {postList.map(post => <Post post={post} key={post.id} />
                )}
        </div>
    )
}