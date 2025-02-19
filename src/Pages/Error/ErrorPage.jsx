
import { BiHeart } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
                <div className="flex items-center justify-center bg-red-500 text-white w-24 h-24 rounded-full shadow-lg">
                    <BiHeart size={50} strokeWidth={1.5} className="animate-pulse" />
                </div>
                <h1 className="text-6xl font-bold text-red-600 mt-6">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mt-2">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-500 mt-2">
                    Looks like you&lsquo;re lost! But don’t worry, every drop counts.
                </p>
                <Link to="/">
                    <button className="mt-6 px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;