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
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import AllRequest from "../Pages/Dashboard/AllRequest/AllRequest";
import ContentHome from "../Pages/Dashboard/ContentManagement/ContentHome";
import AddBlog from "../Pages/Dashboard/ContentManagement/AddBlog";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import DetailsPage from "../Pages/DonationRequest/DetailsPage";
import BlogPage from "../Pages/BlogPage/BlogPage";
import BlogDetails from "../Pages/BlogPage/BlogDetails";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Funds from "../Pages/Funds/Funds";
import DonorSearch from "../Pages/DonorSearch/DonorSearch";


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
                path: '/donation-request',
                element: <DonationRequest></DonationRequest>,
            },
            {
                path: '/donation-request/:id',
                element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/bloodReq/${params.id}`)
            },
            {
                path: '/blog',
                element: <BlogPage></BlogPage>,
            },
            {
                path: '/blog-details/:id',
                element: <BlogDetails></BlogDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/blog/${params.id}`)
            },
            {
                path: '/funding',
                element: <PrivateRoute><Funds></Funds></PrivateRoute>,
            },
            {
                path: '/search',
                element: <DonorSearch></DonorSearch>,
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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <UserProfile></UserProfile>
            },

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
                path: "dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "users",
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: "all-blood-donation-request",
                element: <AdminRoute><AllRequest></AllRequest></AdminRoute>
            },
            {
                path: "content-management",
                element: <AdminRoute> <ContentHome></ContentHome></AdminRoute>
            },
            {
                path: "add-blog",
                element: <AdminRoute> <AddBlog></AddBlog></AdminRoute>
            },
        ]
    }
]);

export default router;