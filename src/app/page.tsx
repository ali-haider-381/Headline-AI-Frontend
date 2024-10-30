"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/mainLogo.png";
import UserIcon from "@/components/UserIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faUpwork, faYoutube, faGoogle, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { isTokenExpired, refreshAccessToken } from "@/utils/tokenUtils";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Auto-scroll function for smooth navigation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const accessToken = localStorage.getItem("access_token");

    if (!email || !accessToken) {
      console.log("User is not logged in or missing access token.");
      return;
    }

    // Check if the access token is expired
    if (isTokenExpired(accessToken)) {
      console.log("Access token expired, attempting to refresh...");
      refreshAccessToken()
        .then((newToken) => {
          if (newToken) {
            setIsLoggedIn(true); // Set user as logged in after token refresh
          }
        })
        .catch(() => {
          console.log("Token refresh failed, logging out.");
          localStorage.removeItem("email");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(true); // Set user as logged in if access token is valid
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <main className="bg-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-400 shadow-lg z-10 rounded-2xl">
  <Image src={logo} alt="logo" className="h-auto w-40" />

  {/* Main navigation for larger screens */}
  <div className="hidden md:flex justify-between items-center w-full">
  <div className="flex justify-center items-center gap-8 flex-grow">
    {/* Navigation Buttons */}
    <button
      onClick={() => scrollToSection("home")}
      className="text-white text-xl font-semibold transition-transform transform hover:scale-105"
    >
      Home
    </button>
    <button
      onClick={() => scrollToSection("about")}
      className="text-white text-xl font-semibold transition-transform transform hover:scale-105"
    >
      About
    </button>
    <button
      onClick={() => scrollToSection("features")}
      className="text-white text-xl font-semibold transition-transform transform hover:scale-105"
    >
      Services
    </button>
    <button
      onClick={() => scrollToSection("contact")}
      className="text-white text-xl font-semibold transition-transform transform hover:scale-105"
    >
      Contact
    </button>
    <button
      onClick={() => scrollToSection("pricing")}
      className="text-white text-xl font-semibold transition-transform transform hover:scale-105"
    >
      Pricing
    </button>
    
  </div>
</div>

  {/* Login button visible on all screens */}
  <div className="flex items-center">
    {!isLoggedIn ? ( // Show the button when not logged in
      <Link href="/login" passHref>
        <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-full transition-transform transform hover:scale-105 shadow-lg">
          Login
        </button>
      </Link>
    ) : (
      // Optionally add user icon or another component for logged-in users
      <UserIcon />
    )}
  </div>
</nav>

{/* Home Section */}
<section
  id="home"
  className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 via-blue-600 via-blue-700 via-blue-800 via-blue-900 to-blue-950 text-center px-4"
>
  <div className="flex flex-col items-center">
    <p className="text-5xl sm:text-6xl md:text-8xl mt-20 bg-gradient-to-r from-blue-300 to-purple-700 bg-clip-text text-transparent font-bold leading-tight">
      HeadlineAI
    </p>

    <p className="text-white text-xl sm:text-2xl md:text-3xl mt-2">
      <span className="text-blue-300">AI-Powered</span> News Application
    </p>
  </div>

  <div className="mt-6">
    <p className="text-white text-lg sm:text-6xl md:text-7xl leading-relaxed mt-10">
      Dear Reader<br />Meet the Fun Side of AI{' '}
      <span className="text-blue-300">Shaping Today’s News!</span><br />in News
    </p>
  </div>

  <div className="flex justify-center mt-20">
    {isLoggedIn ? (
      <Link href="/chat">
        <button className="bg-blue-600 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-black transition duration-300">
          Get started
        </button>
      </Link>
    ) : (
      <Link href="/signup">
        <button className="bg-blue-600 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-black transition duration-300">
          Get Started
        </button>
      </Link>
    )}
  </div>
</section>

<section
  id="about"
  className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-6 group"
>
  {/* Two-color background with hover effect */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-gray-900 transition-all duration-500 group-hover:from-gray-900 group-hover:to-blue-500"></div>
  
  {/* Content */}
  <div className="relative z-10 flex flex-col items-center space-y-6 max-w-4xl">
    <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide">
      About <span className="text-blue-300">HeadlineAI</span>
    </h2>
    <p className="mt-4 text-lg md:text-2xl max-w-3xl leading-relaxed text-gray-300">
      Welcome to <span className="text-blue-300 font-bold">HeadlineAI</span>, your personalized AI-powered news hub. 
      Stay ahead of the curve with intelligent news updates tailored to your interests, delivered directly to you by advanced AI systems.
    </p>

    {/* Additional Features */}
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mt-10">
      <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <span className="text-4xl text-blue-300 mr-4">🤖</span>
        <p className="text-lg">AI-Driven Insights</p>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <span className="text-4xl text-blue-300 mr-4">📈</span>
        <p className="text-lg">Data-Driven Decisions</p>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <span className="text-4xl text-blue-300 mr-4">🔍</span>
        <p className="text-lg">Real-Time Updates</p>
      </div>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section id="features"className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-6 py-16 group">
  {/* Two-color background with hover effect */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black transition-all duration-500 group-hover:from-blue-500 group-hover:to-gray-900"></div>

  <div className="relative z-10">
    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Services
    </h2>
    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
      Discover how our AI-powered platform delivers news in a personalized and interactive way.
    </p>
  </div>

  <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
    {/* AI News Curation */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
      <div className="flex justify-center mb-4">
        <span className="text-4xl group-hover:scale-110 transform transition-all duration-300 text-blue-500">📰</span>
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-all duration-300">
        AI News Curation
      </h3>
      <p className="text-gray-300 group-hover:text-white transition-all duration-300">
        Our AI-driven algorithm selects the most relevant news articles based on your preferences and reading history.
      </p>
    </div>

    {/* Chat-Based Interface */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
      <div className="flex justify-center mb-4">
        <span className="text-4xl group-hover:scale-110 transform transition-all duration-300 text-blue-500">💬</span>
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-all duration-300">
        Chat-Based Interface
      </h3>
      <p className="text-gray-300 group-hover:text-white transition-all duration-300">
        Communicate with an AI agent to get news updates, ask questions, and have real-time conversations about current events.
      </p>
    </div>

    {/* Personalized Alerts */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
      <div className="flex justify-center mb-4">
        <span className="text-4xl group-hover:scale-110 transform transition-all duration-300 text-blue-500">🔔</span>
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-all duration-300">
        Personalized Alerts
      </h3>
      <p className="text-gray-300 group-hover:text-white transition-all duration-300">
        Get real-time notifications about breaking news and topics you care about, delivered straight to your device.
      </p>
    </div>
  </div>
</section>


{/* Contact Section */}
<section
  id="Contact"
  className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-4 group"
>
  {/* Background color that changes on hover */}
  <div className="absolute inset-0 bg-gray-900 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-700"></div>

  <div className="relative z-10">
  <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800">
  Contact
    </h2>
    <p className="mt-4 text-xl max-w-3xl mx-auto leading-relaxed">
      Explore our blog for the latest insights and articles on AI advancements, journalism trends, and the evolving landscape of news. Discover how technology shapes the stories that matter.
    </p>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Example Blog Post Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
        <h3 className="text-2xl font-semibold mb-2">The Future of AI in News</h3>
        <p className="text-gray-300 mb-4">
          How AI is revolutionizing journalism and what it means for the future of news delivery.
        </p>
        <button className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
          Read More
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
        <h3 className="text-2xl font-semibold mb-2">AI Ethics in Journalism</h3>
        <p className="text-gray-300 mb-4">
          A deep dive into the ethical implications of using AI in news reporting and content creation.
        </p>
        <button className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
          Read More
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
        <h3 className="text-2xl font-semibold mb-2">The Rise of Automated News</h3>
        <p className="text-gray-300 mb-4">
          Exploring how automated news generation is changing the media landscape and affecting traditional journalism.
        </p>
        <button className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
          Read More
        </button>
      </div>
    </div>
  </div>
</section>

{/* Pricing Section */}
<section
  id="pricing"
  className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-4 group"
  >
    {/* Background color that changes on hover */}
    <div className="absolute inset-0 bg-gray-900 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-700"></div>
  
    <div className="relative z-10">
  <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800">
      <br />
      <br />
      Pricing Plans
      <br />
      <br />
    </h2>
    <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
      Choose the perfect plan tailored to meet your needs and unlock AI-powered tools for news insights, in-depth analysis, and much more.
    </p>

    {/* Pricing Table */}
    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
      {/* Basic Plan */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white p-6">
          <h3 className="text-3xl font-semibold">Basic</h3>
          <p className="text-4xl font-bold mt-4 mb-6">$9<span className="text-xl">/mo</span></p>
          <button className="w-full bg-white text-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
            Select Plan
          </button>
        </div>
        <div className="p-6">
          <ul className="text-left space-y-4">
            <li>✅ Access to AI News Updates</li>
            <li>✅ Limited Analytics</li>
            <li>✅ Basic Customer Support</li>
            <li>🚫 No Custom Reports</li>
            <li>🚫 No API Access</li>
          </ul>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform scale-105">
        <div className="bg-purple-500 text-white p-6">
          <h3 className="text-3xl font-semibold">Pro</h3>
          <p className="text-4xl font-bold mt-4 mb-6">$29<span className="text-xl">/mo</span></p>
          <button className="w-full bg-white text-purple-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
            Select Plan
          </button>
        </div>
        <div className="p-6">
          <ul className="text-left space-y-4">
            <li>✅ Access to AI News Updates</li>
            <li>✅ Advanced Analytics</li>
            <li>✅ 24/7 Customer Support</li>
            <li>✅ Custom Reports</li>
            <li>🚫 No API Access</li>
          </ul>
          
        </div>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 text-white p-6">
          <h3 className="text-3xl font-semibold">Enterprise</h3>
          <p className="text-4xl font-bold mt-4 mb-6">$99<span className="text-xl">/mo</span></p>
          <button className="w-full bg-white text-green-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
            Select Plan
          </button>
        </div>
        <div className="p-6">
          <ul className="text-left space-y-4">
            <li>✅ All Pro Features</li>
            <li>✅ Unlimited Analytics</li>
            <li>✅ Priority Support</li>
            <li>✅ Custom API Access</li>
            <li>✅ Dedicated Account Manager</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</section>
<br />
<br />
<footer className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* About Us Section */}
      <div className="text-left">
        <h3 className="text-xl font-bold mb-2">About Us</h3>
        <p className="text-gray-200">
          At HeadlineAI, we harness the power of AI to deliver the latest news and insights that shape our world.
        </p>
      </div>
      
      {/* Quick Links Section */}
      <div className="text-left">
        <h3 className="text-xl font-bold mb-2">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/home" className="hover:text-blue-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-300 transition duration-300">About</Link>
          </li>
          <li>
            <Link href="/features" className="hover:text-blue-300 transition duration-300">Features</Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-blue-300 transition duration-300">Blog</Link>
          </li>
        </ul>
      </div>
      
      {/* Follow Us Section */}
      <div className="text-left">
        <h3 className="text-xl font-bold mb-2">Follow Us</h3>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
          </Link>
          <Link href="https://www.upwork.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faUpwork} className="text-2xl" />
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
          </Link>
          <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
          </Link>
          <Link href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>

    <p className="text-gray-300 mt-4">&copy; 2024 HeadlineAI. All rights reserved.</p>
  </div>
</footer>
    </main>
  );
}
export default LandingPage;
