
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useVolunteer from '../Hooks/useVolunteer';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isVolunteer, isVolunteerLoading] = useVolunteer();
    const location = useLocation();
    if (loading || isAdminLoading || isVolunteerLoading) {
        return (
            <div className="loading-container">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    }

    if (user && (isAdmin || isVolunteer)) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;