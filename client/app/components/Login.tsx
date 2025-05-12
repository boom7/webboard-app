'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', username);

        router.push('/board');
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Error during login. Check console.');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-sm text-white">
      <h2 className="text-lg font-semibold mb-4">Sign in</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-4 rounded border border-gray-500 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      {/* <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 rounded border border-gray-500 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
      /> */}
      <button
        onClick={handleLogin}
        className="w-full bg-[#14B76F] hover:bg-[#10a45e] text-white py-2 rounded transition"
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
