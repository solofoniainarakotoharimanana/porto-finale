import React from 'react'
import useAuthStore from '../../store/store.js'
import { useEffect } from 'react';
import Header from '../../components/Header.jsx';

const HomeCompany = () => {
    const { user, token, isAuthenticate, logoutUser, checkAuth } = useAuthStore(state => state);

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <Header token={token} user={user} logoutUser={logoutUser} />
        </div>
    )
}

export default HomeCompany
