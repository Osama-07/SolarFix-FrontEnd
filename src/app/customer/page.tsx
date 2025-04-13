import React from "react";
import TechniciansList from "../components/Technician/TechniciansList";
import CustomerOrdersList from "../components/Customer/CustomerOrdersList";

function Customer() {
  return (
    <div>
      <TechniciansList />
      <CustomerOrdersList />
    </div>
  );
}

export default Customer;
