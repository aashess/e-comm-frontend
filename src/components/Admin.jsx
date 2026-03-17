import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import CreateProductModal from "./CreateProduct";

function AdminPage() {
  const [user, setUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (error) {
        console.error("Error fetching admin details", error);
      }
    };

    fetchUser();
  }, []);

  const handleCreateProduct = (payload) => {
    console.log("Product Created:", payload);
  };

  // if (!user) {
  //   return <div>Loading Admin...</div>;
  // }

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* ADMIN DETAILS */}
      <h2>Admin Profile</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Joined: {user.createdAt}</p>
      <p>Address: {user.address}</p>

      <hr />

      {/* CREATE PRODUCT */}
      <h2>Create Product</h2>

      <button onClick={() => setShowCreateModal(true)}>Add Product</button>

      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}

export default AdminPage;
