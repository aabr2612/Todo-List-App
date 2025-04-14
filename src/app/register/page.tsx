"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
    const [fullName, setfullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register();
        console.log("Form submitted");
    };

    const register = async () => {
        if (!fullName || !username || !email || !password) {
            toast.error("All fields are required");
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            toast.error("Full name can only contain alphabets and spaces");
            return;
        }
        if (username.length < 3 || username.length > 20) {
            toast.error("Username must be between 3 and 20 characters long");
            return;
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            toast.error("Username can only contain letters and numbers");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            const response = await axios.post("/api/register", {
                fullName,
                username,
                email,
                password,
            });
            console.log("Sending request to register user");
            if (response.status === 201) {
                toast.success("User registered successfully");
            } else {
                toast.error("Error registering user", response.data);
            }
        }
        catch (error) {
            console.error("Error registering user:", error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong. Please try again later.");
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
            <div className="w-full max-w-md p-6 md:p-10 bg-white shadow-xl rounded-2xl transition-all duration-300">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 tracking-wide">Create Account</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-150"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-150"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-150"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-150"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg shadow-md transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 hover:underline font-medium">Login</a>
                </p>
            </div>
        </div>
    );
}
