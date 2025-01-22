import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const HomeLayout = () => {
    return (
        <div className="w-11/12 mx-auto max-w-7xl">

            <Navbar></Navbar>

            <main >
                <Outlet ></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;