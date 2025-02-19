import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_API);
console.log(stripePromise);
const Funds = () => {
    const axiosSecure = useAxiosSecure();
    const { data: funds = [] } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axiosSecure.get("payment");
            return res.data;
        }
    });
    return (
        <div className="my-10">
            <div className="flex justify-between">
                <h3 className="text-3xl font-semibold ">All Funder List</h3>
                <button className="btn bg-[#DC143C] border-none text-white hover:text-[#DC143C]" onClick={() => document.getElementById('my_modal_1').showModal()}>Give Fund</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Fund Amount</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            funds.map((fund, idx) =>
                                <tr key={fund._id}>
                                    <th className="dark:text-gray-200">{idx + 1}</th>
                                    <td className="dark:text-gray-200">{fund.name}</td>
                                    <td className="dark:text-gray-200">{fund.price}</td>
                                    <td className="dark:text-gray-200">{fund.date}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm></CheckoutForm>
                        </Elements>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Funds;