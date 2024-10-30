"use client";
// src/app/signup/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import token utilities
import { isTokenExpired } from '@/utils/tokenUtils';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');

    if (email && accessToken && !isTokenExpired(accessToken)) {
      // If the user is logged in, redirect to the chat page
      router.push('/chat');
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when signup starts

    try {
      const response = await fetch("https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Set success message
        setSuccessMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          setSuccessMessage(null); // Hide the message after 3 seconds
          window.location.href = '/login'; // Redirect after signup success
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
<>
  <Head>
    <title>Sign Up</title>
    <meta name="description" content="Signup page" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
    <div className="w-full max-w-lg p-10 space-y-8 bg-white rounded-3xl shadow-2xl ring-4 ring-blue-500/50 transform transition-all hover:scale-105 duration-500">
      <div className="text-center">
        <h2 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
          Create Your Account
        </h2>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSignup}>
        <div className="space-y-5">
          <div className="relative">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none relative block w-full px-5 py-4 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ease-in-out transform hover:shadow-xl"
              placeholder="Enter your Username"
            />
          </div>
          <div className="relative">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-5 py-4 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 ease-in-out transform hover:shadow-xl"
              placeholder="Enter your Email address"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-5 py-4 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:shadow-xl"
              placeholder="Enter your Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-6 text-sm font-medium rounded-full text-white shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${
              loading
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600'
            } focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              'Sign up'
            )}
          </button>
        </div>
      </form>

      {/* Success message popup */}
      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-xl shadow-md">
          {successMessage}
        </div>
      )}

      <div className="text-center mt-6">
        <div className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login">
            <p className="font-medium text-lg text-blue-600 hover:text-blue-800 transition-all">
              Sign in
            </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
</>

  );
}
