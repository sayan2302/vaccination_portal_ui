import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ username, password });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/dashboard');
                sessionStorage.setItem('login', true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error(error.response ? error.response.data.message : 'An error occurred during login');
        }
    };


    useEffect(() => {
        if (sessionStorage.getItem('login')) {
            navigate('/dashboard');
        }
    }, [navigate]);


    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <h1 className='text-4xl'>School Vaccination Portal</h1>
            <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="text-left">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                        />
                    </div>
                    <div className="text-left">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-sm text-gray-500">
                    Hint: Username: <span className="font-semibold text-green-600">"admin"</span> & password: <span className="font-semibold text-green-600">"123"</span>
                </p>
            </div>
        </div>
    );
};

export default Login;