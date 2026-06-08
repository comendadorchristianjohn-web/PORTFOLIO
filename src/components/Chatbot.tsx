"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about the pet dispenser project",
    "What AutoCAD layout work did he do?",
    "What are Christian's tech skills?",
    "How can I contact him?",
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("comendador_portfolio_chat");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages([
          {
            role: "model",
            text: "Hi there! I'm Christian's virtual assistant. Ask me anything about his qualifications, technical skills, process layouts, or projects. I can also help you contact him!",
          },
        ]);
      }
    } else {
      setMessages([
        {
          role: "model",
          text: "Hi there! I'm Christian's virtual assistant. Ask me anything about his qualifications, technical skills, process layouts, or projects. I can also help you contact him!",
        },
      ]);
    }
  }, []);

  // Save chat history to localStorage on updates
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("comendador_portfolio_chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Notify user about bot reply if chatbot window is closed
  useEffect(() => {
    if (messages.length > 1 && !isOpen) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "model") {
        setHasNewMessage(true);
      }
    }
  }, [messages, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map local messages to API payload format
      const payload = currentMessages.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payload }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to API");
      }

      const data = await response.json();
      const replyText = data.text || "I'm having trouble retrieving a response. Please try again.";

      setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I encountered an issue connecting to the chat helper. Christian John's contact email is comendadorchristianjohn@gmail.com and phone is 0976-567-9285 if you'd like to reach him directly!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const resetChat = () => {
    const initial: Message[] = [
      {
        role: "model",
        text: "Hi there! I'm Christian's virtual assistant. Ask me anything about his qualifications, technical skills, process layouts, or projects. I can also help you contact him!",
      },
    ];
    setMessages(initial);
    localStorage.setItem("comendador_portfolio_chat", JSON.stringify(initial));
  };

  // Safe formatting helper to render basic markdown bold and bullet lines nicely
  const formatMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let isBullet = false;
      let cleanedLine = line;

      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        isBullet = true;
        cleanedLine = line.trim().slice(2);
      } else if (line.trim().match(/^\d+\.\s/)) {
        isBullet = true;
        cleanedLine = line.trim().replace(/^\d+\.\s/, "");
      }

      // Format bold markup: **text** -> <strong>text</strong>
      const parts = cleanedLine.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-white text-[12px]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-zinc-300 text-[11.5px] leading-relaxed mb-1.5">
            {formattedParts}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-zinc-300 text-[11.5px] leading-relaxed mb-2 last:mb-0">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <button
          onClick={handleOpenToggle}
          aria-label="Toggle Chatbot"
          className="w-14 h-14 rounded-full glass border border-white/10 hover:border-white/40 flex items-center justify-center text-white cursor-pointer relative shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        >
          {/* Pulsing ring indicator when closed and new message is waiting */}
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-white border border-black flex items-center justify-center text-[8px] text-black font-extrabold">
                1
              </span>
            </span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="w-6 h-6 text-zinc-200 group-hover:text-white transition-colors" />
          )}

          {/* Micro pulsing ambient glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse -z-10 group-hover:bg-white/10 transition-colors" />
        </button>
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[380px] h-[520px] max-h-[calc(100vh-120px)] glass rounded-2xl flex flex-col z-50 shadow-2xl overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="bg-black/90 border-b border-white/5 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Bot className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">Christian's Assistant</span>
                  <span className="text-[9px] text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-zinc-400 animate-pulse" />
                    Gemini 1.5 AI Bot
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={resetChat}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Box */}
            <div
              ref={scrollContainerRef}
              className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin bg-black/40"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg, index) => {
                const isBot = msg.role === "model";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-zinc-300" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div
                        className={`text-xs py-2.5 px-3.5 rounded-2xl shadow-md ${
                          isBot
                            ? "bg-white/5 border border-white/5 text-zinc-200 rounded-tl-none"
                            : "bg-white text-black font-medium rounded-tr-none"
                        }`}
                      >
                        {isBot ? formatMessage(msg.text) : <p className="text-[11.5px] leading-relaxed">{msg.text}</p>}
                      </div>
                    </div>
                    {!isBot && (
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5 uppercase">
                        U
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="bg-white/5 border border-white/5 text-zinc-300 text-xs py-3 px-4 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex items-center gap-1.5 py-0.5">
                      <div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips Carousel/Strip */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2.5 pt-1.5 bg-zinc-950/40 border-t border-white/5 flex-shrink-0 scrollbar-none select-none">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-[10px] font-medium text-zinc-300 bg-white/5 border border-white/5 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-white/10 hover:border-white/10 hover:text-white transition-all duration-200 cursor-pointer flex-shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-black border-t border-white/5 flex gap-2 items-center flex-shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Christian's skills, projects..."
                disabled={isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white transition-colors duration-200 flex-shrink-0 cursor-pointer flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
