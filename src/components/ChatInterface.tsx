"use client";
import { useState, useEffect, useRef } from 'react';
import  formatResponse  from '@/utils/formateResponse';
import SideLayout from "@/components/SidePanel"
 // Import the utility

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ user: string, bot?: string }[]>([]);  // bot can be optional until the response comes
    const [loading, setLoading] = useState(false);
    const [access_token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Ref to handle auto-scrolling
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const handleSend = async () => {
        if (input.trim() && access_token) {
            const userMessage = input;  // Capture the current input
            setMessages(prev => [...prev, { user: userMessage }]);  // Display the user's message immediately
            setInput('');  // Clear the input field

            setLoading(true);
            try {
                const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/ai/call_agent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify({ query: userMessage })  // Use captured input (userMessage)
                });

                if (!response.ok) throw new Error('Failed to fetch data from backend');

                const data = await response.json();
                const botReply = data.messages[data.messages.length - 1].content;

                // Format the bot's response before adding it
                const formattedBotReply = formatResponse(botReply);

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = { user: userMessage, bot: formattedBotReply };  // Update the last message with bot's response
                    return updatedMessages;
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Function to determine dynamic background based on message length
    const getBackgroundClass = (message: string) => {
        const length = message.length;
        if (length < 50) return 'bg-gray-600';  // Short message
        if (length < 100) return 'bg-gray-600';  // Medium message
        return 'bg-gray-600';  // Long message
    };

    // Auto-scroll to the bottom when new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
<div className="flex flex-col h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
    <SideLayout />

    {/* Chat history */}
    <div
        ref={chatContainerRef}  // Attach the ref to enable scrolling
        className="flex-1 overflow-y-auto p-4 pb-28 flex flex-col items-center justify-start"
    >
        <div className="max-w-2xl w-full">
            {messages.map((msg, index) => (
                <div key={index} className="mb-12 flex flex-col items-center">
                    {/* User message */}
                    <div className="w-auto max-w-[90%] p-4 rounded-lg shadow-lg bg-white/90 text-right mb-4 text-gray-800 inline-block break-words hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                        <strong>You:</strong> {msg.user}
                    </div>
                    
                    {/* Bot message */}
                    {msg.bot ? (
                        <div
                            className={`w-auto max-w-[90%] p-4 rounded-lg shadow-lg text-gray-200 bg-blue-600/90 text-left break-words hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105`}
                            dangerouslySetInnerHTML={{ __html: msg.bot }}
                        />
                    ) : loading && index === messages.length - 1 && (
                        <div className="w-auto max-w-[90%] p-4 rounded-lg shadow-lg bg-blue-700 text-left break-words">
                            <span className="animate-pulse text-white">AI is generating...</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>

    {/* Search Bar */}
    <div className="w-full p-4 flex justify-center mb-4">
        <div className="flex items-center w-full max-w-2xl p-4 rounded-lg bg-white/90 shadow-lg transform transition-all hover:scale-105 duration-500">
            <input
                type="text"
                placeholder="Search messages..."
                className="flex-grow px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-300"
                // Add search logic here, if necessary
            />
            <button
                className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-800 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
                Search
            </button>
        </div>
    </div>

    {/* Input section */}
    <div className="w-full fixed bottom-0 left-0 p-4 flex justify-center shadow-2xl backdrop-blur-sm">
        <div className="flex items-center w-full max-w-2xl p-4 rounded-lg bg-white/90 shadow-lg transform transition-all hover:scale-105 duration-500">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Your Query..."
                className="flex-grow px-4 py-2 bg-gray-400/50 rounded-lg text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={!isLoggedIn}
            />
            <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-800 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    </div>
</div>

    );
};

export default ChatInterface;
