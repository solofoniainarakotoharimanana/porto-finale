import React from "react";
import { statusColorAndValue } from "./colorStatus.js";
import { Send, ThumbsUp } from "lucide-react";
import { NavLink } from "react-router-dom";


const Modal = ({ isOpen, onClose, data }) => {
    // console.log("DATA >>> ", data)
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100 m-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg text-center  w-full
                    text-xm uppercase
                    font-bold text-slate-800">{data?.title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body content passed down */}
                <div className="mt-4 text-slate-600">
                    <p className="text-justify">
                        {data?.description}
                    </p>
                </div>
                <div className="mt-4 flex justify-between">
                    <p className={`font-bold text-md
                        ${statusColorAndValue(data?.status)?.[0]}`}>
                        {`${statusColorAndValue(data?.status)?.[1]}`}
                    </p>
                    <div className="flex gap-2 align-center">
                        <span className="text-blue-500 ">Category: </span>
                        <p className="font-bold text-md text-slate-600">{data?.category?.title}</p>
                    </div>
                </div>
                <div className="flex mt-4 gap-2 justify-between">
                    <div className="w-50 flex gap-2">
                        <ThumbsUp className="text-blue-700" />
                        <span className="self-center text-slate-800">
                            {
                                data?.likes?.length > 0 &&
                                    data?.likes?.length > 1 ? `${data?.likes?.length} likes` : `${data?.likes?.length} like`
                            }
                        </span>
                    </div>
                    {data?.status === "created" &&
                        <NavLink
                            className="py-2 px-3 
                                bg-blue-700 rounded-lg
                                hover:bg-blue-800 hover:text-slate-300
                                text-slate-200 flex gap-1"
                            to="/">
                            <Send className='self-center'
                                size={15} />
                            Submit Request
                        </NavLink>
                    }

                </div>
            </div>
        </div>
    );
};

export default React.memo(Modal);