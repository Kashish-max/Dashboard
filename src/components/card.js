import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import { Badge } from "@material-tailwind/react";
import Search from "./search"

const inter = Inter({ subsets: ['latin'] })

const Card = ({ switchOn, tableHead, data }) => {

    return (
        <div className="rounded-[10px] bg-white border-[1.5px] border-gray-200 shadow-sm px-4 py-7 max-h-[calc(100vh-13rem)] overflow-auto">
            <h1 className="text-base text-[#18181B] font-black">Sample data</h1>
            <div className="flex space-x-2 mt-6">
                <div className="flex-grow">
                    <Search />
                </div>
                <Badge content="1" className={`p-0 min-h-[17px] min-w-[17px] text-[11px] ${inter.className}`}>
                    <button 
                        className="flex items-center px-4 py-1 border-[1.5px] border-gray-200 rounded-lg hover:bg-gray-100 transition-all min-w-max"
                    >   
                        <img className="h-4" src="/assets/content/filter.svg" alt="Filter" />
                        <span className={`text-sm font-normal ms-2 ${inter.className}`}>Filter</span>
                    </button>
                </Badge>
                <button 
                    className="flex items-center px-4 py-1 border-[1.5px] border-gray-200 rounded-lg hover:bg-gray-100 transition-all min-w-max"
                >   
                    <img className="h-4" src="/assets/content/export.svg" alt="Export" />
                    <span className={`text-sm font-normal ms-2 ${inter.className}`}>Export</span>
                </button>
            </div>
            <div className="mt-6">
                <table className="table-auto w-full text-sm w-full">
                    <thead>
                        <tr>
                            <th className="border-b font-medium px-4 py-3 text-slate-400 bg-gray-50">
                                <input type="checkbox" className="align-middle" disabled />
                            </th>
                            {tableHead.map((col) => {
                                return (
                                    <th key={col.key} className="border-b font-medium px-4 py-3 text-slate-400 text-left bg-gray-50 text-xs">
                                        {col.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    
                    {switchOn &&
                        <tbody className="bg-white">
                            {data && data.map((item) => {
                                return (
                                    <tr className="align-baseline hover:bg-gray-50">
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