import React, { FC } from "react";
import { DecadevDashboardLayout, IsAuthenticatedDecadev } from "../component";
import { Outlet } from "react-router-dom";

type AdminDashboardProps = {};

const DecadevDashboard: FC = (props: AdminDashboardProps) => {
  return (
    <IsAuthenticatedDecadev>
      <DecadevDashboardLayout>
        <Outlet />
      </DecadevDashboardLayout>
    </IsAuthenticatedDecadev>
  );
};

export default DecadevDashboard;
