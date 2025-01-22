import { Link } from "react-router-dom";


const Login = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const loginInfo = {
            email, password
        };
        console.log(loginInfo);

    };
    return (
        <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="hero-content max-w-4xl w-full px-4">
                <div className="card bg-white shadow-2xl rounded-lg w-full">
                    <form onSubmit={handleSubmit} className="card-body p-8">

                        <h2 className="text-2xl font-bold text-center text-[#DC143C] mb-6">
                            Login to Your Account
                        </h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered border-gray-300 outline-none"
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover text-[#DC143C] hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#DC143C] hover:bg-red-700 text-white border-none">
                                Login
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don’t have an account?{" "}
                            <Link to={'/register'} href="#" className="text-[#DC143C] font-medium hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;