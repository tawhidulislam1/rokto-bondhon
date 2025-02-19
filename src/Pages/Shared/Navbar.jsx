
import { MdBloodtype } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import '../../../src/index.css';
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("YOur are logout now");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };
    console.log(user);
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/donation-request'}>donation requests</NavLink></li>
        <li><NavLink to={"/blog"}>blog</NavLink></li>
        <li><NavLink to={"/funding"}>Funding</NavLink></li>
        <li><NavLink to={"search"}> Search Donors</NavLink></li>
    </>;
    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);

        // Apply theme to the root element
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save preference in localStorage
        localStorage.setItem("theme", newTheme);
    };
    return (
        <div className="navbar text-white bg-[#DC143C]  fixed w-full top-0 left-0 h-[90px] z-50">
            <div className="navbar-start pl-2">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="text-xl flex items-center"><MdBloodtype />Roktho Bondhon</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end pr-2">
                <div>
                    <label className="grid cursor-pointer place-items-center">
                        <input
                            type="checkbox"
                            value="dark"
                            className="toggle theme-controller bg-base-content col-span-2 col-start-1"
                            checked={isDarkMode}
                            onChange={handleThemeToggle}
                        />
                       
                    </label>
                </div>
                {
                    user ? <>
                        <>


                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" >
                                    <div className="tooltip " data-tip={user?.displayName}>
                                        <img
                                            src={user?.photoURL}
                                            title={user?.displayName}
                                            alt="User Avatar"
                                            className="rounded-full w-14 ml-2"
                                        />

                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content  bg-[#DC143C] rounded-box z-[1] mt-3 w-52 p-2 shadow">

                                    <li><Link to={'/dashboard/profile'}>Dashboard</Link></li>
                                    <li><button onClick={handleLogOut} ><FaSignOutAlt></FaSignOutAlt> Logout</button></li>
                                </ul>
                            </div>
                        </>
                    </> : <>
                        <Link to={'/login'}> <button className="btn  bg-[#ffffff] text-[#DC143C]">Login</button></Link>
                    </>
                }



            </div>
        </div>
    );
};

export default Navbar;