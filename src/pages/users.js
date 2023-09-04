import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import SubHeader from "@/components/sub-header";
import Card from "@/components/card";

const Body = () => {
    const { data: session, status } = useSession();

    const [switchOn, setSwitchOn] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                const updatedData = users.map(updateData);
                setData(updatedData);
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
        { label: "Name", key: "name" }, 
        { label: "Username", key: "username" }, 
        { label: "Email ID", key: "email" }, 
        { label: "Phone", key: "phone" }, 
        { label: "Address", key: "address" }, 
        { label: "Website", key: "website" }, 
        { label: "Company", key: "company" },
    ]

    return (
        <div>
            <div className="mb-6 sm:mb-9">
                <SubHeader user={session?.user} setSwitchOn={setSwitchOn} />
            </div>
            <Card 
                switchOn={switchOn} 
                data={data} 
                setData={setData} 
                tableHead={tableHead} 
            />
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