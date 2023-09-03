import Layout from "@/components/layout";
import { useAuth } from "@/components/layout";

const Body = () => {
    const { session, status } = useAuth();

    return (
        <div className="px-11 py-9">
            <h1 className="text-4xl font-bold h-200%">{session?.user.name}</h1>
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