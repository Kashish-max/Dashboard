import { useRouter } from "next/router";
import { useState } from "react";
import { Inter } from 'next/font/google';
import { Badge, Tooltip } from "@material-tailwind/react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useSearch } from "./layout";
import FilterMenu from "./menus/filter-menu";
import ExportMenu from "./menus/export-menu";
import Search from "./search";

const inter = Inter({ subsets: ['latin'] })

const Card = ({ switchOn, tableHead, data, setData }) => {
    const router = useRouter();
    const slug = router.route.slice(1);

    const { search, setSearch } = useSearch();

    const [loading, setLoading] = useState(false);    
    const [prevKey, setPrevKey] = useState(null);
    const [prevOrder, setPrevOrder] = useState(1);

    const [activeCol, setActiveCol] = useState(null);

    const handleSort = (key) => {
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
                let fa = a[key].toLowerCase(),
                    fb = b[key].toLowerCase();
            
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
    function searchNestedObject(obj, searchString) {
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

    return (
        <div className="rounded-[10px] bg-white border-[1.5px] border-gray-200 shadow-sm px-4 pt-7 pb-9 max-h-[calc(100vh-13rem)] overflow-auto">
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
                                    <Tooltip content={`Sort by ${col.label}`} placement="top" className="text-[10px] font-medium bg-gray-500 rounded-sm [word-spacing:2px] px-1.5 py-1">
                                        <th 
                                            key={col.key} 
                                            className={`border-b font-medium px-4 py-3 text-slate-400 text-left text-xs cursor-pointer hover:bg-gray-200 ${activeCol == col.key.toLowerCase() ? 'bg-gray-200 border-b-2 border-gray-300': 'bg-gray-50'}`}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            <div className="flex w-full justify-between items-center">
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
                            {data && data.filter((item) => searchNestedObject(item, search)).map((item, i) => {
                                return (
                                    <tr key={i} className="align-baseline hover:bg-gray-50">
                                        <th className="border-b font-medium px-4 py-3 text-slate-400">
                                            <input type="checkbox" className="align-middle" />
                                        </th>                                    
                                        {Object.keys(item).map((key, index) => {
                                            return (
                                                <td key={key} className="border-b border-slate-100 p-4 text-slate-500 text-left font-normal text-xs">
                                                    {item[tableHead[index].key]}
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