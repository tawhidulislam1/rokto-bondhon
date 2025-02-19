
const Stats = () => {
    return (
        <div>
            <div className="my-10">
                <h2 className="text-center text-3xl font-semibold text-[#2E2E2E] dark:text-gray-200">Our Impact</h2>
                <p className="text-center text-lg text-gray-600 py-3 dark:text-gray-200">We are a community making a difference, one donation at a time.</p>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                    {/* Donors */}
                    <div className="card bg-[#FDEDEC] shadow-xl">
                        <div className="card-body text-center">
                            <h3 className="text-4xl font-bold text-[#D93F47]">669</h3>
                            <p className="text-xl text-gray-500 dark:text-gray-800">Donors</p>
                        </div>
                    </div>

                    {/* Districts */}
                    <div className="card bg-[#FDEDEC] shadow-xl">
                        <div className="card-body text-center">
                            <h3 className="text-4xl font-bold text-[#D93F47]">64</h3>
                            <p className="text-xl text-gray-500 dark:text-gray-800">Districts</p>
                        </div>
                    </div>

                    {/* Blood Groups */}
                    <div className="card bg-[#FDEDEC] shadow-xl">
                        <div className="card-body text-center">
                            <h3 className="text-4xl font-bold text-[#D93F47]">8</h3>
                            <p className="text-xl text-gray-500 dark:text-gray-800">Blood Groups</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;