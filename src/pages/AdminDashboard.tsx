import React, { FC } from "react";
import { DashboardLayout, IsAuthenticated } from "../component";
import { Outlet } from "react-router-dom";

type AdminDashboardProps = {};

const AdminDashboard: FC = (props: AdminDashboardProps) => {
  return (
    <IsAuthenticated userRole={["SL", "SA", "PA"]}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </IsAuthenticated>
  );
};

export default AdminDashboard;
