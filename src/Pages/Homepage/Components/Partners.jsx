const Partners = () => {
    return (
        <div className="my-10 px-5">
            <h2 className="text-center text-3xl font-semibold text-[#2E2E2E] dark:text-gray-200">Our Partners & Sponsors</h2>
            <p className="text-center text-lg text-gray-600 py-3 dark:text-gray-200">
                We are proud to collaborate with these amazing organizations.
            </p>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center items-center mt-6">

                <div className="flex flex-col items-center space-y-2">
                    <img src="https://i.ibb.co.com/Ng3CJYnS/images.png" alt="Red Cross" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium dark:text-gray-200">Red Cross</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <img src="https://i.ibb.co.com/GfGkFj05/GBF-Logo.png" alt="Blood Donor Org" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium dark:text-gray-200">Blood Donor Org</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <img src="https://i.ibb.co.com/G3sb01Kn/download.jpg" alt="Life Saver Hospital" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium dark:text-gray-200">Life Saver Hospital</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <img src="https://i.ibb.co.com/KxN1Ydgh/Pp5-ZFon-XGAx-ZYl02.png" alt="Global Blood Bank" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium dark:text-gray-200">Global Blood Bank</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <img src="https://i.ibb.co.com/7N6d66MW/Untitled-design-9.jpg" alt="Health & Hope" className="w-24 h-24 object-contain rounded-lg shadow-md" />
                    <p className="text-gray-700 text-sm font-medium dark:text-gray-200">Health & Hope</p>
                </div>
            </div>
        </div>
    );
};

export default Partners;
