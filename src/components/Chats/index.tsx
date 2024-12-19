"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

interface ChatProps {
  id?: any;
  user_id?: any;
  user?: any;
  chatmessage: string;
  entity: string;
}

const Chat: React.FC<ChatProps> = ({ id, user_id, user, chatmessage, entity = 'lmn' }) => {
  const [newMessage, setNewMessage] = useState("");
  const { data: session }: any = useSession();
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    setIsSubmitting(true);
    try {
      if (newMessage.trim()) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/messages/store-message/${id}`,
          {
            message: newMessage,
            type: "Normal",
            entity: entity
          },
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );
        setNewMessage("");
        if (response.status === 200) {
          console.log("Text message sent successfully!");
          fetchData();
        } else {
          setError("Failed to send message");
        }
      }

      if (selectedFiles.length > 0) {
        await uploadImages();
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files[]", file);
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/messages/upload-files`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    setImagesURL(response.data.paths);
    setSelectedFiles([]); // Clear selected files after upload
  };

  const fetchData = async () => {
    try {
      const token = session.token;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/messages/list-messages/${id}/${entity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.result);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    var objDiv: any = document.getElementById("your_div");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!session) return;
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    if (imagesURL.length > 0) {
      imagesURL.forEach(async (url) => {
        await handleSendImage(process.env.NEXT_PUBLIC_STORAGE_PATH + url);
      });
      setImagesURL([]);
    }
  }, [imagesURL]);

  const handleSendImage = async (imageURL: string) => {
    if (imageURL) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/messages/store-message/${id}`,
          {
            message: imageURL,
            type: "Image",
            entity: entity
          },
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Image message sent successfully!");
          fetchData();
        } else {
          setError("Failed to send image");
        }
      } catch (error: any) {
        toast.error(error.response.data.message)
      } finally {
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto bg-white border shadow-md mb-3 rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b">
        <h1 className="text-xl font-semibold mb-0">{chatmessage}</h1>
      </div>

      <div className="p-4 bg-gray-100">
        {messages.length === 0 && (
          <div className="text-center">No messages</div>
        )}
        <div className="overflow-y-auto max-h-[30vh] mb-4" id="your_div">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex items-start mb-4 ${message.user_id !== user_id ? "justify-start" : "justify-end"}`}
            >
              {message.user_id !== user_id ? (
                <div className="flex items-center space-x-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${message?.user?.avatar}`}
                    alt="avatar"
                  />
                  <div className="flex flex-col bg-white">
                    <div className="bg-white p-2 rounded-lg">
                      {message.type === "Image" ? (
                        <a
                          href={message.message}
                          download
                          className="text-sm mb-0 flex items-center whitespaces-nowrap"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/myImages/document.svg"
                            alt="File Icon"
                            width={24}
                            height={24}
                          />{" "}
                          &nbsp; {message.message.split("/").pop()}
                        </a>
                      ) : (
                        <p className="text-sm mb-0">{message.message}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment(message.created_at).fromNow()}
                  </span>
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <span className="text-xs text-gray-500 block mt-1">
                    <br />
                    {moment(message.created_at).fromNow()}
                  </span>
                  <div className="p-2 rounded-lg bg-white">
                    {message.type === "Image" ? (
                      <a
                        href={message.message}
                        download
                        className="text-sm mb-0 flex items-center whitespaces-nowrap"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/myImages/document.svg"
                          alt="File Icon"
                          width={24}
                          height={24}
                        />{" "}
                        &nbsp; {message.message.split("/").pop()}
                      </a>
                    ) : (
                      <p className="text-sm mb-0">{message.message}</p>
                    )}
                  </div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user?.avatar}`}
                    alt="avatar"
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {selectedFiles.length > 0 && (
          <div className="mb-4 flex gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-min p-2 bg-white rounded-lg shadow whitespace-nowrap"
              >
                <div className="flex items-center">
                  <Image
                    src="/myImages/new-document.svg"
                    alt="File Icon"
                    width={24}
                    height={24}
                  />
                  <span className="ml-2 text-sm truncate" title={file.name}>
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center border border-1 p-1 space-x-2 bg-white justify-between rounded-md">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow px-3 py-3 text-sm border-none focus:outline-none bg-transparent"
          />

          <button
            className="text-gray-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src="/myImages/link1.svg"
              alt="Link"
              width={24}
              height={24}
              className="rounded-full"
            />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            multiple={true}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <button
            onClick={handleSend}
            disabled={isSubmitting}
            className={`bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              <Image src="/myImages/send.svg" alt="Send" width={24} height={24} />
            )
            }
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default Chat;
