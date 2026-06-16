import { Bell, LogIn, LogOut, LucideAlignVerticalDistributeStart } from 'lucide-react';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

import avatar from "../assets/avatar.png"
import { useEffect } from 'react';

const Header = ({ token, logoutUser, user }) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const navigation = [
        { name: "Home", href: "#" },
        { name: "My Request", href: "#" },
        // { name: "Marketplace", href: "#" },
        // { name: "Company", href: "#" },
    ];
    const handleLogout = () => {
        logoutUser();
        navigate('/login')
    }

    return (
        <nav className="sticky  top-0 left-0 z-50 w-full border-b 
                border-gray-200 bg-white/80 backdrop-blur-md
                dark:border-gray-800 dark:bg-gray-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo Section */}
                    <div className="shrink-0">
                        <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">
                            Find a partner
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:block">
                        {
                            token ? (
                                <div className='flex gap-4 justify-end align-center'>
                                    <span className='text-white font-thin text-sm self-center'>Welcome {user?.firstname} {user?.lastname}</span>
                                    <img src={avatar} className='w-8 h-8 rounded-full object-cover self-end' />
                                    <div className='relative self-center'>
                                        {/* <span class="flex align-center left-1.5 top-0
                                        justify-center items-center rounded-full bg-blue-50 px-0.5 py-0.5 text-md text-red-700 ring-1 ring-inset ring-blue-700/10 font-bold">
                                            1
                                        </span> */}
                                        <Bell size={30} className=' text-white font-bold' />
                                    </div>

                                    <div className='flex gap-2'>

                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="rounded-lg flex gap-2
                                        bg-linear-to-b from-pink-600 to-amber-600 px-2 h-10 text-md self-end text-white shadow-xs
                                        font-bold cursor-pointer">
                                        <LogOut size={15} className='self-center' />
                                        <span className='self-center'>Logout</span>
                                    </button>
                                </div>
                            ) :
                                (
                                    <button
                                        className="rounded-lg 
                                bg-blue-600 px-4 py-2 text-sm text-white shadow-xs
                                transition-colors hover:bg-blue-500
                                flex gap-2 font-bold cursor-pointer">
                                        <LogIn size={18} />
                                        Login
                                    </button>
                                )
                        }


                    </div>

                    {/* Mobile Menu Hamburger Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-gray-200 bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                id="mobile-menu"
            >
                <div className="flex items-center justify-between">
                    <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">
                        BrandLogo
                    </a>
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold text-md text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="py-6">
                            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-500">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
