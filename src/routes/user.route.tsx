import UserDashboard from "../components/Dashboard/User/UserDashboard";
import ShowOrder from "../pages/userOrderManagement/ShowOrder";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },

  {
    name: "Show Orders",
    path: "show-user-orders",
    element: <ShowOrder />,
  }
];
