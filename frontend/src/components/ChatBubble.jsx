function ChatBubble({ sender, message }) {

  return (
    <div
      className={`max-w-[70%] p-4 rounded-2xl mb-4 ${
        sender === "user"
          ? "bg-primaryPink ml-auto"
          : "bg-white"
      }`}
    >
      {message}
    </div>
  );
}

export default ChatBubble;