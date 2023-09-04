import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";

const Body = () => {

    const [switchOn, setSwitchOn] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(comments => {
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then(posts => {
                        const updatedData = updateData(posts, comments);
                        setData(updatedData);      
                    })
            })
    }, [])

    function updateData(posts, comments) {
        return comments.map((comment) => {
            const post = posts.find((post) => post.id === comment.postId);
            const { id, postId, ...rest } = comment;
            if (post) {
                return {
                  ...rest,
                  post: post.title,
                };
            }
            return {
                ...rest,
                post: postId,
            };
        });
    }

    const tableHead = [
        { label: "Name", key: "name" }, 
        { label: "User Email", key: "email" }, 
        { label: "Comment", key: "body" }, 
        { label: "Posted on", key: "post" }, 
    ]

    return (
        <div>
            <div className="mb-6 sm:mb-9">
                <SubHeader setSwitchOn={setSwitchOn} />
            </div>
            <Card
                switchOn={switchOn} 
                data={data} 
                setData={setData} 
                tableHead={tableHead}
                sustainMinColWidth={true}
            />
        </div>
    );
}

const Comments = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Comments;