import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

const Body = () => {
    const { data: session, status } = useSession();
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{session?.user.name}</h1>
        </div>
    );
}

const Dashboard = () => {
    return (
        <Layout>
            <Body />
        </Layout>
    );
}

export default Dashboard;