"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the Next.js router

// Utility to check token expiration (can be stored in a utility file)
function isTokenExpired(token: string) {
  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
  return Date.now() > expiryTime;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success popup
  const router = useRouter(); // Use Next.js router to redirect

  // Check if the user is already logged in by checking email and access token
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');

    if (storedEmail && accessToken && !isTokenExpired(accessToken)) {
      // User is logged in, redirect to the chat page
      router.push('/chat');
    }
  }, [router]); // Run this on component mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch("https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('username', 'Me'); // Set the actual username
        localStorage.setItem('email', email); // Save the email

        // Set success message
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          setSuccessMessage(null); // Hide the message after 3 seconds
          window.location.href = '/chat'; // Redirect after success
        }, 1000);
      } else {
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
<>
  <Head>
    <title>Login</title>
    <meta name="description" content="Login page" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
    <div className="w-full max-w-lg p-10 space-y-8 bg-white rounded-3xl shadow-2xl ring-4 ring-blue-500/50 transform transition-all hover:scale-105 duration-500">
      <div className="text-center">
        <h2 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-5">
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
              'Sign in'
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
          Don't have an account?{' '}
          <Link href="/signup">
            <p className="font-medium text-lg text-blue-600 hover:text-blue-800 transition-all">
              Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
</>

  );
}
