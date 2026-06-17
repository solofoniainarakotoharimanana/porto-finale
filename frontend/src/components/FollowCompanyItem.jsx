import React from 'react'
import { useState } from 'react';
import useAuthStore from '../store/store';
import useUserStore from '../store/userStore';
import avatar from "../assets/avatar.png"
import { Rss } from 'lucide-react';



const FollowCompanyItem = ({ company }) => {
    const [follows, setFollows] = useState(company.followers);
    const { user } = useAuthStore(state => state);
    const { followUnfollowCompany } = useUserStore(state => state);
    // const isFollowed = follows.includes(user._id);

    const isFollowed = follows.includes(user?._id);
    const handleFollowCompany = async (companyId) => {
        await followUnfollowCompany(companyId);
        setFollows(company.followers)
        console.log("IS FOLLOWED >> ", isFollowed)
    }



    return (
        <div className='py-3 flex gap-3 '>
            <img src={avatar} className='w-8 h-8 rounded-full object-cover self-end' />
            <p className='text-slate-900 font-bold self-end'>{company.username}</p>
            <div className='ml-auto'>
                <button
                    onClick={() => handleFollowCompany(company._id)}
                    className='flex gap-2 
                            px-3 py-2 cursor-pointer
                            bg-slate-900
                            rounded-md
                        text-white/80 '>
                    <Rss size={20} />
                    {isFollowed ? 'Followed' : 'Follow'}
                </button>
            </div>

        </div>
    )
}

export default FollowCompanyItem
