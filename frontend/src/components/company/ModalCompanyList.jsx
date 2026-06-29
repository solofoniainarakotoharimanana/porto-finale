import { Building2, Funnel, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalCompanyList = ({ isOpen, onClose, datas, handleChooseMe }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const filteredCompanies = datas?.filter(item =>
        item.username.toLowerCase().includes(query.toLowerCase())
    );

    // console.log("DATA >>> ", data)
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100 m-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg text-center  w-full
                    uppercase text-3xl font-extrabold
                    text-indigo-500">LIST COMPANY</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 cursor-pointer  hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex">
                    <div className='p-4'>
                        <div className='flex gap-2 my-4'>
                            <input
                                type="text"
                                id="username"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Find company by name"
                                className="w-[40%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <select
                                id="countries"
                                className="w-[40%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="" disabled hidden>Choose a country...</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                            <button
                                className='w-[20%] bg-blue-700 py-2 px-2 flex gap-2 justify-center align-center
                            rounded-sm hover:bg-blue-600 cursor-pointer font-bold
                            hover:text-white/90 transition-all duration-300 ease-in-out 
                            text-white '>
                                <Funnel size={15} className='mt-1 font-bold' />
                                Filter</button>
                        </div>
                    </div>
                </div>
                {
                    filteredCompanies?.map((company) => {
                        return <div
                            key={company._id}
                            className="flex justify-between my-4">
                            <div className="flex gap-2">
                                <Building2 size={36} />
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">{company.username}</span>
                                    <span className="text-sm text-gray-500">{company.email}</span>
                                </div>
                            </div>
                            <div className="flex justify-center align-center gap-2">
                                <SquarePen size={15} className="self-end bg-orange-500 text-white cursor-pointer" />
                                <button
                                    onClick={() => handleChooseMe(company._id)}
                                    className="self-end bg-green-600 px-2 py-1 text-sm text-white rounded-sm cursor-pointer">
                                    Choose me
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default React.memo(ModalCompanyList);