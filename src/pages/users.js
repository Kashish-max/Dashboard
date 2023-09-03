import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useAuth } from "@/components/layout";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";

const Body = () => {
    const { session, status } = useAuth();
    const [switchOn, setSwitchOn] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                const updatedData = json.map(updateData);
                console.log(updatedData)
                setData(updatedData)
            })
    }, [])

    function updateData(obj) {
        const addressString = `${obj.address.suite} ${obj.address.street}, ${obj.address.city}`;
        const companyName = obj.company.name;
        delete obj.id;
        return {
            ...obj,
            address: addressString,
            company: companyName,
        };
    }

    const tableHead = [
        { title: "Name", key: "name" }, 
        { title: "Username", key: "username" }, 
        { title: "Email ID", key: "email" }, 
        { title: "Phone", key: "phone" }, 
        { title: "Address", key: "address" }, 
        { title: "Website", key: "website" }, 
        { title: "Company", key: "company" },
    ]

    return (
        <div className="">
            <div className="mb-9">
                <SubHeader user={session?.user} setSwitchOn={setSwitchOn} />
            </div>
            <Card switchOn={switchOn} tableHead={tableHead} data={data} />
        </div>
    );
}

const Users = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Users;