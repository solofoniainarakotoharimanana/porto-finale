import { Check, Mail, User } from 'lucide-react'
import React from 'react'

const CompanyItem = ({ company }) => {
    return (
        <div className='shadow-sm transition-all duration-300 hover:-translate-y-1'>
            <h3 className='w-full text-center bg-green-600 py-4
                text-xl uppercase font-extrabold text-shadow-2xs
                text-white
            '>{company.username}</h3>
            <div className='flex justify-between align-center'>
                <div className='flex flex-col py-6 align-center justify-content p-4'>
                    <div className="flex gap-2 my-2">
                        <Mail size={15} className='self-center text-gray-400' />
                        <span className='text-blue-600 font-extrabold text-lg'>Email</span>
                    </div>
                    <p className='text-gray-500 text-sm font-medium '>{company.email}</p>
                </div>

                <div className='flex flex-col py-6 align-center justify-content p-4'>
                    <div className="flex gap-2 my-2">
                        <User size={15} className='self-center text-gray-400' />
                        <span className='text-blue-600 font-extrabold text-lg'>Name</span>
                    </div>
                    <p className='text-gray-500 text-sm font-medium '>{company.username}</p>
                </div>
            </div>
            <div className='p-4 flex gap-3' >
                <div className='flex gap-6'>
                    <button className='flex gap-2 p-2 
                         bg-[#e8e8e8] text-[#212121] 
                         cursor-pointer shadow-sm relative
                         duration-200
                         '>
                        <Check />
                        <span>Choose Me</span>
                    </button>
                </div>
            </div>

        </div >
    )
}

export default CompanyItem
