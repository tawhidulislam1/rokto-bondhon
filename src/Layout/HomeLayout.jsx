import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const HomeLayout = () => {
    return (
        <div >

            <Navbar></Navbar>

            <main className="w-11/12 mx-auto max-w-7xl mt-24">
                <Outlet ></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;