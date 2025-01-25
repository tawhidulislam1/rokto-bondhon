

import { useState } from 'react';
import { BiBookContent } from 'react-icons/bi';
import { FaAd, FaCalendar, FaHome, FaPaypal, FaShoppingCart, FaUsers } from 'react-icons/fa';

import { IoIosClose } from 'react-icons/io';
import { MdMenu, MdOutlineBloodtype } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';



const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isAdmin = true;
    const isVolunteer = true;
    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar */}
                <div className={`w-full sm:w-64 min-h-screen bg-orange-400 transition-all ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
                    <ul className="menu">
                        {isAdmin ? (
                            <>
                                <li><NavLink to={'/dashboard/adminHome'}><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to={'/dashboard/all-blood-donation-request'}><MdOutlineBloodtype />All Blood Donation Request</NavLink></li>
                                <li><NavLink to={'/dashboard/content-management'}><BiBookContent /> Content Management
                                </NavLink></li>
                                <li><NavLink to={'/dashboard/users'}><FaUsers /> All Users</NavLink></li>
                                <li><NavLink to={'/dashboard/profile'}><FaUsers /> profile</NavLink></li>
                            </>
                        ) : isVolunteer ? (
                            <>
                                <li><NavLink to={'/dashboard/adminHome'}><FaHome /> Dashboard</NavLink></li>

                                <li><NavLink to={'/dashboard/all-blood-donation-request'}><MdOutlineBloodtype />All Blood Donation Request</NavLink></li>
                                <li><NavLink to={'/dashboard/content-management'}><BiBookContent /> Content Management
                                </NavLink></li>
                                <li><NavLink to={'/dashboard/profile'}><FaShoppingCart /> profile</NavLink></li>

                            </>
                        ) : (
                            <>
                                <li><NavLink to={'/dashboard/userHome'}><FaHome /> User Home</NavLink></li>
                                <li><NavLink to={'/dashboard/my-donation-requests'}><FaCalendar /> My Donation Requests</NavLink></li>
                                <li><NavLink to={'/dashboard/create-donation-request'}><FaPaypal /> Create Donation Request</NavLink></li>
                                <li><NavLink to={'/dashboard/profile'}><FaShoppingCart /> profile</NavLink></li>

                            </>
                        )}
                        <div className="divider"></div>
                        {/* Home page redirect */}
                        <li><NavLink to={'/'}><FaHome /> Home</NavLink></li>
                        <li><NavLink to={'/menu'}><FaCalendar /> Menu</NavLink></li>
                        <li><NavLink to={'/Shop'}><FaShoppingCart /> Shop</NavLink></li>
                        <li><NavLink to={'/dashboard/review'}><FaAd /> Contact</NavLink></li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 ml-14 p-8">
                    {/* Toggle Button for Small Devices */}
                    <button
                        className="sm:hidden p-3 bg-orange-400 text-white rounded-full fixed top-4 left-4 z-30"
                        aria-label="Toggle Sidebar"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <IoIosClose size={24} /> : <MdMenu size={24} />}
                    </button>
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;