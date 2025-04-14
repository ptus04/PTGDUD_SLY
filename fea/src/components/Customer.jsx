import React, { useEffect, useState } from "react";

function Customer() {
  const [data, setData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch data from API
  useEffect(() => {
    fetch("https://res.cloudinary.com/dqyqckhcd/raw/upload/customer.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newChatMessage = {
      id: Date.now(),
      sender: "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: "sent",
    };

    setData((prevData) => {
      const updatedChats = {
        ...prevData.chats,
        [selectedUserId]: [...prevData.chats[selectedUserId], newChatMessage],
      };
      return { ...prevData, chats: updatedChats };
    });

    setNewMessage("");
  };

  const selectedChat = selectedUserId ? data.chats[selectedUserId] : [];

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full bg-white p-4 shadow md:w-1/3">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contacts</h3>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul className="space-y-4">
          {data.users.map((user) => (
            <li
              key={user.id}
              className={`flex cursor-pointer items-center space-x-4 ${
                selectedUserId === user.id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="truncate text-xs text-gray-500">{user.message}</p>
              </div>
              {user.unread && (
                <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
                  {user.unread}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Chat Section */}
      <div className="flex-1 bg-white p-4 shadow">
        {selectedUserId ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {data.users.find((user) => user.id === selectedUserId).name}
              </h3>
            </div>
            <div className="space-y-4">
              {selectedChat.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-${
                    message.type === "sent" ? "end justify-end" : "start"
                  } space-x-4`}
                >
                  {message.type === "received" && (
                    <img
                      src={
                        data.users.find((user) => user.id === selectedUserId)
                          .avatar
                      }
                      alt="User"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "sent"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                  {message.type === "sent" && (
                    <img
                      src="https://i.pravatar.cc/40?img=7"
                      alt="You"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Customer;
