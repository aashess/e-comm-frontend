import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'

const user = {
    name: "Aashish Jha",
    email: "hello@gmail.com",
    role: "ADMIN",
    createdAt: "16 Jan 2026",
    profile_picture: "https://avatars.githubusercontent.com/u/92213759?v=4",
    address: "Noida Sector 17",
    cart: ['pen', 'cup', 'keyboard', 'mouse', 'monitor', 'laptop']
}

const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [address, setAddress] = useState("")
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        
        try {
            const response = axios.get(`${API_BASE_URL}/auth/get-user`, {
                withCredentials: true
            })

            setName(response.data.name)
            setEmail(response.data.email)
            setRole(response.data.role)
            setCreatedAt(response.data.createdAt)
            setProfilePicture(response.data.profilePicture)
            setAddress(response.data.name)

            
            } catch (error) {
                console.error('Error while fetching User Details.', error);
            }

    },[])


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                    <img
                        src={user.profile_picture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                </div>

                {/* Name */}
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    {user.name}
                </h1>

                {/* Details */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <span className="text-sm text-gray-900">{user.email }</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Role</span>
                        <span className="text-sm text-gray-900">{user.role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Member Since</span>
                        <span className="text-sm text-gray-900">{user.createdAt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Address</span>
                        <span className="text-sm text-gray-900">{user.address}</span>
                    </div>
                </div>

                {/* Cart Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">Cart Items</h2>
                    <div className="space-y-2">
                        {user.cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile