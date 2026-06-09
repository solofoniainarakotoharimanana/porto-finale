import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import useAuthStore from '../../store/store.js'

import UserProjects from "../../components/UserProjects.jsx"
import MyProjectList from "../../components/MyProjectList.jsx"

const HomeUser = () => {
    const { user, token, isAuthenticate, logoutUser, checkAuth } = useAuthStore(state => state);

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <Header token={token} user={user} logoutUser={logoutUser} />
            <main className='container mx-auto px-4'>
                <UserProjects />
                <MyProjectList />
            </main>
        </div>
    )
}

export default HomeUser
