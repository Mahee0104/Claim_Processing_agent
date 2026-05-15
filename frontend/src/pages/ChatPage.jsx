import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";

function ChatPage() {

  const messages = [
    {
      sender: "bot",
      message: "Hello! What insurance claim do you want help with?",
    },

    {
      sender: "user",
      message: "Health Insurance Claim",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-6 h-[85vh] flex flex-col">

        <div className="flex-1 overflow-y-auto">

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
          />

          <button className="bg-primaryPink px-6 rounded-xl">
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatPage;