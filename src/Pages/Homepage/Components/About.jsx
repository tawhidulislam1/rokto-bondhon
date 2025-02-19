import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";


const About = () => {
    const { user } = useAuth();
    return (
        <div className="my-5">
            <section className="bg-base-200 py-12">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Left Side - Image */}
                        <div className="lg:w-1/2">
                            <img
                                src="https://i.ibb.co.com/239CHzh9/Blood-donation-1-15fb156346d608d01eedd828c4b7e50c.webp"
                                alt="Blood Donation"
                                className="rounded-xl shadow-lg w-full"
                            />
                        </div>

                        {/* Right Side - Text */}
                        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                            <h2 className="text-3xl font-bold text-[#DC143C]">About Roktho Bondhon</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-200">
                                Roktho Bondhon is a platform dedicated to saving lives by
                                connecting blood donors with those in need. Our mission is to
                                create a community where finding blood donors is quick, easy,
                                and accessible for everyone.
                            </p>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Join us in making a difference—one donation at a time.
                            </p>

                            {/* Call to Action */}
                            <div className="mt-6">
                                <div className="flex gap-5 justify-start">
                                    <Link to={user?.email ? "/dashboard/profile" : "/login"}>
                                        <button className="btn bg-white border-none text-[#DC143C] hover:bg-[#DC143C] hover:text-white">Join As A Donor</button>
                                    </Link>
                                    <Link to={'/search'}>
                                        <button className="btn bg-[#DC143C] border-none text-white hover:text-[#DC143C]">Search Donors</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;