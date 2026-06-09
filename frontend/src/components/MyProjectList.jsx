import React from 'react'
import ListAndNewProject from './ListAndNewProject'
import FollowCompany from './FollowCompany'

const MyProjectList = () => {
    return (
        <div className='flex lg:flex-row xl:flex-row md:flex-col gap-3 my-6'>
            <ListAndNewProject />
            <FollowCompany />
        </div>
    )
}

export default MyProjectList
