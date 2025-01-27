import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Header = () => {
    const { user } = useAuth();
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://i.ibb.co.com/kmxnRTr/images-4.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-3xl">
                    <h1 className="mb-5 text-5xl font-bold">SMS-based platform to connect blood searchers with donors</h1>
                    <p className="mb-5">
                        Rokto-bondhon is a real-time free platform to help blood searchers connect voluntary blood donors around Bangladesh.
                    </p>
                    <div className="flex gap-5 justify-center">
                        <Link to={user?.email ? "/dashboard/profile" : "/login"}>
                            <button className="btn bg-[#DC143C] border-none text-white hover:text-[#DC143C]">Join As A Donor</button>
                        </Link>
                        <button className="btn bg-white border-none text-[#DC143C] hover:bg-[#DC143C] hover:text-white">Search Donors</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;