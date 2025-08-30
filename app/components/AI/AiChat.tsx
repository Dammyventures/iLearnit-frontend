"use client";
import React, { FC, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { styles } from "@/app/styles/style";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import Link from "next/link";
import { useGetTranscriptMutation } from "@/redux/features/courses/coursesApi";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";
import { 
  FiSend, 
  FiDownload, 
  FiMessageSquare, 
  FiUser, 
  FiCpu,
  FiClock
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

type Props = {
  videoName: string;
};
interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

interface ChatSession {
  sendMessage: (message: string) => Promise<any>;
}

interface Data {
  transcript?: string;
  success: boolean;
  courseName: string;
}

interface Result {
  data?: Data;
  error?: FetchBaseQueryError | any;
}

const AiChat: FC<Props> = ({ videoName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [transcript, setTranscript] = useState<string | undefined>("");
  const [courseName, setCourseName] = useState<string | undefined>("");
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const MODEL_NAME = "gemini-2.5-flash";
  const API_KEY = "AIzaSyCfca8PC51rg8HzmtjT58WrkCh5e0cP6D4";
  
  const courseId = useParams();
  const [getTranscript, { data, isLoading: isTranscriptLoading, error }] =
    useGetTranscriptMutation();

  // Memoize the objects that were causing the dependency issues
  const genAI = useMemo(() => new GoogleGenerativeAI(API_KEY), []);
  
  const generationConfig = useMemo(() => ({
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  }), []);
  
  const safetySettings = useMemo(() => [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ], []);

  // Move the initChat function outside of useEffect and wrap it in useCallback
  const initChat = useCallback(async () => {
    try {
      const newChat: any = await genAI
        .getGenerativeModel({ model: MODEL_NAME })
        .startChat({
          generationConfig,
          safetySettings,
          history: [...messages].map((msg: Message) => ({
            parts: [{ text: msg.text }],
            role: msg.role === "bot" ? "model" : msg.role,
          })),
        });
      setChat(newChat);
    } catch (err: any) {
      setErr("Something Went Wrong!");
    }
  }, [messages, generationConfig, safetySettings, genAI, MODEL_NAME]);

  useEffect(() => {
    initChat();
  }, [initChat, transcript, courseName]); // Add all dependencies

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");
      setIsLoading(true);
      
      if (chat) {
        let trs: string = transcript
          ? `Use following Transcript if required NOT Compulsory - "${transcript}" and`
          : "and";
        const prompt: string = `QUESTIION - ${userInput} Answer the following question and  provide answer in context to concepts associated with ${videoName} or  ${courseName} only , 
        ${trs} 
        If question is out of context or not related to programming then just Send Response as "Please ask  questions only related to ${videoName}".`;
        const result = await chat.sendMessage(prompt);
        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (err: any) {
      setErr("Something is wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGetTranscript = async () => {
    try {
      setIsLoading(true);
      const result: Result = await getTranscript({
        id: courseId?.id,
        videoName,
      });
      
      if (result) {
        let trs: string | undefined = result?.data?.transcript;
        setTranscript(trs);
        let cname: string | undefined = result?.data?.courseName;
        setCourseName(cname);
      }
      
      if (chat && courseName) {
        let noTRS: string = `mention "No transcript available for course!, But still here is a short summary on ${videoName}" and provide 3-4 line summary for ${videoName}`;
        let yesTRS: string = `Summarize the following transcript - ${transcript} in context to ${courseName} `;
        const prompt: string = transcript ? yesTRS : noTRS;
        const result = await chat.sendMessage(prompt);
        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        alert("Try Again");
      }
    } catch (err) {
      console.error("Error fetching transcript:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading || isTranscriptLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
            <Link href={"/"} className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <RiRobot2Line className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                iLearnIT AI Assistant
              </span>
            </Link>
            <div className="flex space-x-2">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Action Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleGetTranscript}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiDownload className="text-lg" />
                <span>Generate Summary</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-inner p-4 mb-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <FiMessageSquare className="text-4xl mb-2 opacity-50" />
                  <p className="text-center">
                    Start a conversation about <br />
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{videoName}</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl p-4 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <div className={`rounded-full p-1 ${msg.role === "user" ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"}`}>
                            {msg.role === "user" ? <FiUser size={14} /> : <FiCpu size={14} />}
                          </div>
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <div className={`text-xs mt-2 flex items-center ${msg.role === "user" ? "text-indigo-200" : "text-gray-500"}`}>
                              <FiClock className="mr-1" />
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
              {err && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center">
                  {err}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
              <input
                type="text"
                placeholder="Type your message here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                className={`p-3 rounded-full ml-2 ${
                  isLoading || !userInput.trim()
                    ? "bg-gray-300 text-gray-500 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300"
                }`}
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat;