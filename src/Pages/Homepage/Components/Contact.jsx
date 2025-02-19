import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";


const Contact = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-6">
                    Contact Us
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Have any questions or need help? Reach out to us!
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Send Us a Message
                        </h3>
                        <form className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full bg-white"
                                />
                            </div>
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full bg-white"
                                />
                            </div>
                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Enter your message"
                                    className="textarea textarea-bordered w-full h-32 bg-white"
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <button className="btn border-none w-full bg-[#DC143C] hover:bg-red-700 text-white">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Contact Information
                        </h3>
                        <p className="text-gray-700 mb-4">
                            You can also reach us via phone or visit us at our location.
                        </p>
                        <div className="space-y-4">
                            {/* Phone */}
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#DC143C] text-white p-3 rounded-full">
                                    <FaPhoneAlt className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Call Us</h4>
                                    <p className="text-gray-600">+88 01878457216</p>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#DC143C] text-white p-3 rounded-full">
                                    <FaEnvelope className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Email Us</h4>
                                    <p className="text-gray-600">designwithtawhid@gmail.com</p>
                                </div>
                            </div>
                            {/* Location */}
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#DC143C] text-white p-3 rounded-full">
                                    <FaMapMarkerAlt className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Visit Us</h4>
                                    <p className="text-gray-600">
                                        Feni ,Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;