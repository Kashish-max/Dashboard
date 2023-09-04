import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";
import Loading from "@/components/loading";

const Body = () => {

    const [switchOn, setSwitchOn] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(albums => {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then(users => {
                        const updatedData = updateData(users, albums);
                        setData(updatedData);
                    })
            })
    }, [])

    function updateData(users, albums) {
        return albums.map((album) => {
            const user = users.find((user) => user.id === album.userId);
            const { id, userId, ...rest } = album;
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
        { label: "Album By", key: "username" }, 
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

const Albums = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Albums;