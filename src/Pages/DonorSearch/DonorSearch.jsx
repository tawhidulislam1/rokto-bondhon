import { useState } from "react";

const DonorSearch = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");
    const [donors, setDonors] = useState([]);

    const handleSearch = () => {
        // Simulate a donor search (Replace this with actual API call logic)
        const mockDonors = [
            { name: "John Doe", bloodGroup: "A+", district: "Dhaka", upazila: "Gulshan" },
            { name: "Jane Smith", bloodGroup: "O+", district: "Chittagong", upazila: "Patiya" },
        ];

        const filteredDonors = mockDonors.filter(
            (donor) =>
                donor.bloodGroup === bloodGroup &&
                donor.district === district &&
                donor.upazila === upazila
        );

        setDonors(filteredDonors);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Search Blood Donors</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">Blood Group</label>
                    <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">District</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    >
                        <option value="">Select District</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        {/* Add more districts here */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Upazila</label>
                    <select
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    >
                        <option value="">Select Upazila</option>
                        {district === "Dhaka" && <option value="Gulshan">Gulshan</option>}
                        {district === "Chittagong" && <option value="Patiya">Patiya</option>}
                        {/* Add more upazilas dynamically based on the district */}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Donor List</h3>
                {donors.length > 0 ? (
                    <ul className="space-y-2">
                        {donors.map((donor, index) => (
                            <li
                                key={index}
                                className="p-4 border rounded-lg shadow-sm flex justify-between"
                            >
                                <span>{donor.name}</span>
                                <span className="text-sm text-gray-600">
                                    {donor.bloodGroup} - {donor.district}, {donor.upazila}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No donors found. Please refine your search.</p>
                )}
            </div>
        </div>
    );
};

export default DonorSearch;
