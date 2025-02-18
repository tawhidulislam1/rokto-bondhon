const Partners = () => {
    return (
        <div className="my-10 px-5">
            <h2 className="text-center text-3xl font-semibold text-[#2E2E2E]">Our Partners & Sponsors</h2>
            <p className="text-center text-lg text-gray-600 py-3">
                We are proud to collaborate with these amazing organizations.
            </p>

            {/* Static Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center items-center mt-6">
                {/* Partner 1 */}
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://via.placeholder.com/150" alt="Red Cross" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium">Red Cross</p>
                </div>

                {/* Partner 2 */}
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://via.placeholder.com/150" alt="Blood Donor Org" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium">Blood Donor Org</p>
                </div>

                {/* Partner 3 */}
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://via.placeholder.com/150" alt="Life Saver Hospital" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium">Life Saver Hospital</p>
                </div>

                {/* Partner 4 */}
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://via.placeholder.com/150" alt="Global Blood Bank" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium">Global Blood Bank</p>
                </div>

                {/* Partner 5 */}
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://via.placeholder.com/150" alt="Health & Hope" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium">Health & Hope</p>
                </div>
            </div>
        </div>
    );
};

export default Partners;
