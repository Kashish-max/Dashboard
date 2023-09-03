import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Loading from '@/components/loading';

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import BaseSpeedDial from './speed-dial';

import { createContext, useContext } from 'react';
const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

const Layout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if(status === 'unauthenticated') router.push('/');
    }, [session, status]);

    if(status === 'loading') return <Loading />;

    return (
        <UserContext.Provider value={{ session, status }}>
            <div className="min-h-screen min-w-screen bg-[#fafafb]">
                <Navbar />            
                <div className="flex">
                    <Sidebar />
                    <div className="flex-grow h-[calc(100vh-4rem)] mt-16 overflow-auto">
                        {children}
                    </div>
                </div>
                <BaseSpeedDial />
            </div>
        </UserContext.Provider>
    );
}

export default Layout;