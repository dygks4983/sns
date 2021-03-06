import React from "react";

export default function Post({post}) {
    const { caption, photo, location } = post;
    return (
        <div>
            <img src={photo} alt={caption} style={{ width: "100px"}}/>
            {caption}, {location}
        </div>
    )
}


