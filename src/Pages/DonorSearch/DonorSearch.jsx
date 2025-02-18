import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxosPublic from "../../Hooks/useAxiosPublic";

const DonorSearch = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [upazila, setUpazila] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [donors, setDonors] = useState([]);
    const axiosPublic = useAxosPublic();
    // Fetch districts
    useEffect(() => {
        fetch("./districts.json")
            .then(res => res.json())
            .then(data => setDistrict(data));
    }, []);

    // Fetch upazilas based on selected district
    useEffect(() => {
        if (selectedDistrict) {
            fetch("./upazilas.json")
                .then(res => res.json())
                .then(data => {
                    const filteredUpazilas = data.filter(upazila => upazila.district_id === selectedDistrict.id);
                    setUpazila(filteredUpazilas);
                });
        }
    }, [selectedDistrict]);

    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        const selected = district.find(d => d.name === districtName);
        setSelectedDistrict(selected);
    };
    const { data: users = [] } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get("/user");
            return res.data;
        },
    });
    const handleSearch = () => {
      

        const filteredDonors = users.filter(
            (donor) =>
                donor.bloodGroup === bloodGroup &&
                donor.district === selectedDistrict.name &&
                donor.upajela === selectedUpazila
        );
        console.log(filteredDonors);

        setDonors(filteredDonors);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
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
                        className="w-full border rounded-lg p-2"
                        value={selectedDistrict.name || ""}
                        onChange={handleDistrictChange}
                        required
                    >
                        <option value="">Select District</option>
                        {district.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name} ({d.bn_name})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Upazila</label>
                    <select
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    >
                        <option value="">Select Upazila</option>
                        {upazila.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
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
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    donors.map((donor, idx) =>
                                        <tr key={donor._id}>
                                            <th>{idx + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img src={donor.image} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{donor.name}</td>
                                            <td>{donor.email}</td>
                                            <td>{donor.date}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No donors found. Please refine your search.</p>
                )}
            </div>
        </div>
    );
};

export default DonorSearch;
