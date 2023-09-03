import Layout from "@/components/layout";
import { useAuth } from "@/components/layout";

const Body = () => {
    const { session, status } = useAuth();

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