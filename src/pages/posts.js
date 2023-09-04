import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";

const Body = () => {

    const [switchOn, setSwitchOn] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then(users => {
                        const updatedData = updateData(users, posts);
                        setData(updatedData);     
                    })
            })
    }, [])

    function updateData(users, posts) {
        return posts.map((post) => {
            const user = users.find((user) => user.id === post.userId);
            const { id, userId, ...rest } = post;
            if (user) {
                return {
                  ...rest,
                  username: user.username,
                };
            }
            return {
                ...rest,
                username: userId,
            };
        });
    }

    const tableHead = [
        { label: "Title", key: "title" }, 
        { label: "Body", key: "body" }, 
        { label: "Posted By", key: "username" }, 
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

const Posts = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Posts;