import React, { useEffect } from 'react'
import { Rss } from 'lucide-react'
import useCompanyStore from '../store/companyStore'
import useUserStore from '../store/userStore'
import FollowCompanyItem from './FollowCompanyItem'



const FollowCompany = () => {
    const { companies, getCompanies } = useCompanyStore(state => state);
    useEffect(() => {
        getCompanies();
    }, [])



    return (
        <div className='p-3 shadow-md bg-white lg:w-[30%] xl:w-[30%] md:w-[100%] sm:w-[100%]'>
            <h1
                className='text-slate-900
                        font-extrabold text-xl
                    '>
                Follow companies
            </h1>
            {companies?.map((c) => {
                return <FollowCompanyItem
                    key={c._id}
                    company={c}
                />
            })}
        </div>
    )
}

export default FollowCompany
