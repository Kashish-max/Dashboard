import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Loading from '@/components/loading';

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import BaseSpeedDial from './speed-dial';

import { createContext, useContext } from 'react';
const SearchContext = createContext();
export const useSearch = () => {
  return useContext(SearchContext);
};

const Layout = ({ children }) => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const { data: session, status } = useSession();

    if(status === 'loading') return <Loading className="w-screen h-screen -translate-y-12" />;
    if(status === 'unauthenticated') router.push('/');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            <div className="min-h-screen min-w-screen bg-[#fafafb]">
                <Navbar />            
                <div className="flex">
                    <Sidebar />
                    <div className="flex-grow h-[calc(100vh-4rem)] mt-16 overflow-x-auto overflow-y-hidden sm:overflow-y-auto px-0 sm:px-2 md:px-11 py-7 sm:py-9">
                        {children}
                    </div>
                </div>
                <BaseSpeedDial />
            </div>
        </SearchContext.Provider>
    );
}

export default Layout;