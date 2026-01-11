import React, { useState, useEffect } from 'react';
import { CheckCircle2, ListTodo, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useLogin } from '../../api/userDataController';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { mutate: login,  isPending, isSuccess, isError, error } = useLogin();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(
            {name: form.name, email: form.email, password: form.password, isLogin: isLogin },
            {
                onSuccess: (response) => {
                    if (response?.token) {
                        localStorage.setItem('token', response.token);
                        navigate('/');
                    } else if (response?.isLogin === true && response?.token) {
                        localStorage.setItem('token', response.token);
                        navigate('/');
                    } else {
                        setIsLogin(true);
                    }
                }
            }
        );
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setForm({ name: '', email: '', password: '' });
    };


    useEffect(() => {
        if (isError) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -ml-36 -mb-36"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                            <ListTodo className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-white">TaskFlow</span>
                    </div>

                    <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                        Organize your life,<br />one task at a time
                    </h2>
                    <p className="text-xl text-white/90 mb-12">
                        Simple, powerful task management for individuals and teams.
                    </p>

                    <div className="space-y-4">
                        {[
                            'Create and organize tasks effortlessly',
                            'Set deadlines and stay on track',
                            'Group tasks into projects',
                            'Track your progress with ease'
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-white/95">
                                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                                <span className="text-lg">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white/80 text-sm">
                    © 2026 TaskFlow. All rights reserved.
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                            <ListTodo className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {isLogin ? 'Welcome back!' : 'Create account'}
                            </h1>
                            <p className="text-gray-500">
                                {isLogin
                                    ? 'Sign in to continue to your tasks'
                                    : 'Sign up to start organizing your tasks'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            // className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200
                                        focus:border-indigo-500 focus:outline-none transition-colors
                                        text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 
               focus:border-indigo-500 focus:outline-none transition-colors 
               text-gray-900 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 
               focus:border-indigo-500 focus:outline-none transition-colors 
               text-gray-900 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                                {!isPending && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                                {' '}
                                <button
                                    onClick={toggleMode}
                                    className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                                >
                                    {isPending ? 'Loading.....' : isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}