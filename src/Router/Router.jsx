import {
    createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Homepage from "../Pages/Homepage/Homepage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>,
            },
        ]
    },
]);

export default router;