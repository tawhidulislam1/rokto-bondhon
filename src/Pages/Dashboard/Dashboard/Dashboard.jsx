import useAuth from "../../../Hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h3 className="text-3xl">Welcome back, <strong>{user?.displayName}</strong></h3>
        </div>
    );
};

export default Dashboard;