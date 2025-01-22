import {
    createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";


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
]);

export default router;