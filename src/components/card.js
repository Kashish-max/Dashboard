import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Inter } from 'next/font/google';
import { Badge, Tooltip } from "@material-tailwind/react";
import { ArrowUpIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ReactPaginate from 'react-paginate';
import { useSearch } from "./layout";
import FilterMenu from "./menus/filter-menu";
import ExportMenu from "./menus/export-menu";
import Search from "./search";

const inter = Inter({ subsets: ['latin'] })

const Card = ({ 
    switchOn, 
    data, 
    setData, 
    tableHead, 
    sustainMinColWidth,
    dataPerPage = 10,
}) => {
    const router = useRouter();
    const slug = router.route.slice(1);

    // Search
    const { search, setSearch } = useSearch();

    // Column Sort
    const [loading, setLoading] = useState(false);    
    const [prevKey, setPrevKey] = useState(null);
    const [prevOrder, setPrevOrder] = useState(1);
    const [activeCol, setActiveCol] = useState(null);

    // Pagination
    const [dataItemOffset, setDataItemOffset] = useState(0);
    const endOffset = dataItemOffset + dataPerPage;
    const currentData = data.slice(dataItemOffset, endOffset);
    const pageCount = Math.ceil(data.length / dataPerPage);

    // Piesocket
    const [channel, setChannel] = useState(null);
    const userId = "user_"+(Math.floor(Math.random() * 1000));

    useEffect(() => {  
        const PieSocket = require("piesocket-js");
        let connection = new PieSocket({
            clusterId: process.env.NEXT_PUBLIC_PIESOCKET_CLUSTER_ID,
            apiKey: process.env.NEXT_PUBLIC_PIESOCKET_API_KEY,
            notifySelf: true,
            presence: true,
            userId: userId,
        });
        
        connection.subscribe("chat-room").then( ch => {
            setChannel(ch);            
            ch.listen("system:member_joined", function(socket_data){
                console.log(`You ${socket_data.member.user} joined the chat room`);
            })

            ch.listen("new_message", function(socket_data, meta){
                if(socket_data.sender != userId) {
                    if(socket_data.type == "sort")
                        performSort(socket_data.message)
                }
            })

            // ch.publish("new_message", {
            //     type: "sort",
            //     sender: userId,
            //     message: key,
            // });           
        });
    }, []);

    // Column Sort
    const handleSort = (key) => { 
        performSort(key);
    }

    const performSort = (key) => {
        setLoading(true);
        setActiveCol(key);

        let order = prevOrder;
        if(prevKey == key) {
            setPrevOrder(prevOrder * -1);
            order = order * -1;
        }
        setTimeout(() => {
            let sortedData = data;
            sortedData.sort((a, b) => {
                try {a[key] = a[key].toLowerCase()} catch {};
                try {b[key] = b[key].toLowerCase()} catch {};
                let fa = String(a[key]),
                    fb = String(b[key]);
            
                if (fa < fb) return -1 * order;
                if (fa > fb) return 1 * order;
                return 0;
            });
            
            setData(sortedData);  
            setPrevKey(key);
            setLoading(false);
        }, 10);
    }

    // Search all possible words in nested object (case insensitive)
    const searchNestedObject = (obj, searchString) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                if (searchNestedObject(obj[key], searchString)) {
                    return true;
                }
            } else if (typeof obj[key] === 'string') {
                if (obj[key].toLowerCase().includes(searchString?.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }      

    // Pagination
    const handlePageTransition = (event) => {
        const newOffset = (event.selected * dataPerPage) % data.length;
        setDataItemOffset(newOffset);
    };

    // Detect if the string is a url
    const isUrl = (string) => {
        try { new URL(string)} 
        catch (_) { return false }
        return true;
    }
    
    return (
        <div className="rounded-none sm:rounded-[10px] bg-white border-[1.5px] border-gray-200 shadow-sm px-4 pt-5 sm:pt-7 pb-9 max-h-[calc(100vh-17rem)] sm:max-h-[calc(100vh-13rem)] overflow-auto">
            <h1 className="text-base text-[#18181B] font-black">Sample data</h1>
            <div className="flex space-x-2 mt-6">
                <div className="flex-grow">
                    <Search setSearch={setSearch} delay={500} />
                </div>              
                <Badge content="1" className={`p-0 min-h-[17px] min-w-[17px] text-[11px] ${inter.className}`}>
                    <FilterMenu>
                        <button 
                            className="flex items-center px-4 py-1 border-[1.5px] border-gray-200 rounded-lg hover:bg-gray-100 transition-all min-w-max"
                        >   
                            <img className="h-4" src="/assets/content/filter.svg" alt="Filter" />
                            <span className={`text-sm font-normal ms-2 ${inter.className}`}>Filter</span>
                        </button>
                    </FilterMenu>
                </Badge>
                <ExportMenu csvTitleRow={tableHead} data={data} fileName={slug}>
                    <button 
                        className="flex items-center px-4 py-1 border-[1.5px] border-gray-200 rounded-lg hover:bg-gray-100 transition-all min-w-max"
                    >   
                        <img className="h-4" src="/assets/content/export.svg" alt="Export" />
                        <span className={`text-sm font-normal ms-2 ${inter.className}`}>Export</span>
                    </button>
                </ExportMenu>
            </div>
            {switchOn && 
                <div className="min-w-fit">
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" className="fill-[#3F3F46] w-5 me-2">
                                    <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd"></path>
                                </svg> 
                                <span className="hidden lg:inline">Previous</span>
                            </div>
                        }
                        nextLabel={
                            <div className="flex items-center">
                                <span className="hidden lg:inline">Next</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="fill-[#3F3F46] w-5 ms-2">
                                    <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        }
                        onPageChange={handlePageTransition}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        className="flex justify-end items-center mt-3 space-x-3 lg:space-x-4 text-xs font-medium text-slate-400"
                        activeClassName="sm:bg-blue-500 sm:text-white sm:hover:bg-blue-600"
                        pageClassName="rounded-md w-6 h-6 flex justify-center items-center font-bold hover:bg-gray-200"
                    />                  
                </div>
            }
            <div className="mt-6">
                <table className="table-auto w-full text-sm w-full">

                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th className="border-b font-medium px-4 py-3 text-slate-400 bg-gray-50">
                                <input type="checkbox" className="align-middle" disabled />
                            </th>
                            {tableHead.map((col) => {
                                return (
                                    <Tooltip key={col.key} content={`Sort by ${col.label}`} placement="top" className="text-[10px] font-medium bg-gray-500 rounded-sm [word-spacing:2px] px-1.5 py-1">
                                        <th  
                                            className={`border-b font-medium px-4 py-3 text-slate-400 text-left text-xs cursor-pointer hover:bg-gray-200 ${activeCol == col.key.toLowerCase() ? 'bg-gray-200 border-b-2 border-gray-300': 'bg-gray-50'} ${sustainMinColWidth && "min-w-[12rem]"}`}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            <div className="flex w-full justify-between items-center min-w-max">
                                                <span>{col.label}</span>
                                                <span>{activeCol == col.key.toLowerCase() && <ArrowUpIcon strokeWidth={2} className={`h-3 w-3 text-[#3F3F46] ${prevOrder == 1 ? 'transform rotate-180': ''}`} />}</span>
                                            </div>
                                        </th>
                                    </Tooltip>
                                )
                            })}
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    {switchOn &&
                        <tbody className="bg-white">
                            {currentData && currentData.filter((item) => searchNestedObject(item, search)).map((item, i) => {
                                return (
                                    <tr key={i} className="align-baseline hover:bg-gray-50">
                                        <th className="border-b font-medium px-4 py-3 text-slate-400">
                                            <input type="checkbox" className="align-middle" />
                                        </th>                                    
                                        {Object.keys(item).map((key, index) => {
                                            return (
                                                <td key={key} className="border-b border-slate-100 p-4 text-slate-500 text-left font-normal text-xs">
                                                    {isUrl(item[tableHead[index].key]) ?
                                                        <a 
                                                            href={item[tableHead[index].key]} 
                                                            target="_blank"
                                                            className="font-medium text-blue-700 hover:text-blue-800 visited:text-purple-600"
                                                        >
                                                            {item[tableHead[index].key]}
                                                        </a>
                                                        :
                                                        item[tableHead[index].key]
                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>                                                                    
                                )
                            })}
                        </tbody>                        
                    }
                </table>        
                {!switchOn && <p className="w-full text-center text-sm font-bold my-6">No data available</p>}        
            </div>
        </div>        
    )
}

export default Card;