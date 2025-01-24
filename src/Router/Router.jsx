import {
    createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import CreateReq from "../Pages/Dashboard/CreateReq/CreateReq";
import ShowReq from "../Pages/Dashboard/ShowRq/ShowReq";
import UpdateReq from "../Pages/Dashboard/UpdateReq/UpdateReq";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "create-donation-request",
                element: <CreateReq></CreateReq>
            },
            {
                path: "my-donation-requests",
                element: <ShowReq></ShowReq>
            },
            {
                path: "udpateReq/:id",
                element: <UpdateReq></UpdateReq>,
                loader: ({ params }) => fetch(`http://localhost:5000/bloodReq/${params.id}`)
            },

            //admin
            {
                path: "users",
                element: <AllUser></AllUser>
            },
        ]
    }
]);

export default router;