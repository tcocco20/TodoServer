import ProtectedRoute from "./ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
