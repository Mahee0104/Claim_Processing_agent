import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";

function ChatPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message:
        "Hello! Select a claim and ask your query.",
    },
  ]);

  const [claims, setClaims] = useState([]);

  const [selectedClaim, setSelectedClaim] =
    useState("");

  useEffect(() => {

    fetchClaims();

  }, []);

  const fetchClaims = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://127.0.0.1:8000/claims/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "CLAIMS:",
        response.data
      );

      setClaims(response.data);

    } catch (error) {

      console.log(error.response?.data);
    }
  };

  const handleSendMessage = async () => {

    if (!message.trim()) return;

    if (!selectedClaim) {

      alert("Please select a claim");

      return;
    }

    const userMessage = {
      sender: "user",
      message: message
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(

        "http://127.0.0.1:8000/chat/",

        {
          message: message,
          claim_id: selectedClaim
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "CHAT RESPONSE:",
        response.data
      );

      const botMessage = {
        sender: "bot",
        message:
          response.data.response
      };

      setMessages((prev) => [
        ...prev,
        botMessage
      ]);

    } catch (error) {

      console.log(error.response?.data);

      const errorMessage = {
        sender: "bot",
        message:
          "Error connecting to AI backend."
      };

      setMessages((prev) => [
        ...prev,
        errorMessage
      ]);
    }

    setMessage("");
  };

  return (

    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-6 h-[85vh] flex flex-col">

        <div className="mb-4">

          <select
            className="border p-3 rounded-xl w-full"
            value={selectedClaim}
            onChange={(e) =>
              setSelectedClaim(e.target.value)
            }
          >

            <option value="">
              Select Claim
            </option>

            {claims.map((claim) => (

              <option
                key={claim.id}
                value={claim.id}
              >
                Claim #{claim.id} —
                {claim.insurance_type}
              </option>

            ))}

          </select>

        </div>

        <div className="flex-1 overflow-y-auto space-y-4">

          {messages.map((msg, index) => (

            <ChatBubble
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))}

        </div>

        <div className="flex gap-3 mt-4">

          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border p-3 rounded-xl"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button
            onClick={handleSendMessage}
            className="bg-primaryPink px-6 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatPage;