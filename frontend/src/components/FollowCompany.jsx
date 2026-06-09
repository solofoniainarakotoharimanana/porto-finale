import React from 'react'
import avatar from "../assets/avatar.png"
import { Rss } from 'lucide-react'

const companies = [
    {
        name: "DevOpt"
    },
    {
        name: "Santosha"
    },
    {
        name: "Rina BTP"
    },
    {
        name: "RAVO COnstruct"
    },
    {
        name: "Kentia Consulting"
    },
    {
        name: "ONG Rivotra"
    }
]


const FollowCompany = () => {

    return (
        <div className='p-3 shadow-md bg-white lg:w-[30%] xl:w-[30%] md:w-[100%] sm:w-[100%]'>
            <h1
                className='text-slate-900
                        font-extrabold text-xl
                    '>
                Follow companies
            </h1>
            {companies.map((c) => {
                return <div key={c.name} className='py-3 flex gap-3 '>
                    <img src={avatar} className='w-8 h-8 rounded-full object-cover self-end' />
                    <p className='text-slate-900 font-bold self-end'>{c.name}</p>
                    <div className='ml-auto'>
                        <button
                            className='flex gap-2 
                            px-3 py-2 cursor-pointer
                            bg-slate-900
                            rounded-md
                        text-white/80 '>
                            <Rss size={20} />
                            Follow
                        </button>
                    </div>

                </div>
            })}
        </div>
    )
}

export default FollowCompany
