import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";

const Body = () => {

    const [switchOn, setSwitchOn] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(photos => {
                fetch('https://jsonplaceholder.typicode.com/albums')
                    .then(response => response.json())
                    .then(albums => {
                        const updatedData = updateData(albums, photos);
                        setData(updatedData);     
                    })
            })
    }, [])

    function updateData(albums, photos) {
        return photos.map((photo) => {
            const album = albums.find((album) => album.id === photo.albumId);
            const { id, albumId, ...rest } = photo;
            if (album) {
                return {
                  ...rest,
                  album: album.title,
                };
            }
            return {
                ...rest,
                album: albumId,
            };
        });
    }

    const tableHead = [
        { label: "Image Title", key: "title" }, 
        { label: "Album", key: "album" }, 
        { label: "url", key: "url" }, 
        { label: "Thumbnail Url", key: "thumbnailUrl" }, 
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

const Photos = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Photos;