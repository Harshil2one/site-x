import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Box, Typography } from "@mui/material";
import { Bot, RefreshCw, Send, X } from "lucide-react";
import Input from "../UI/Input";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TypeAnimation } from "react-type-animation";
import axiosInstance from "../../utils/axiosInstance";
import { generateText } from "../../utils/genAIService";
import useFetch from "../../hooks/useFetch";

const AIBot = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { makeAPICall } = useFetch();

  const [isBotOpened, setIsBotOpened] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    const response = await axiosInstance.get(`/chat/messages/${user.id}`);
    setMessages(response.data.data.messages);
  };

  const sendMessage = async () => {
    if (message?.trim()?.length <= 2) return;
    const reply = await generateText(message);
    await makeAPICall(`chat/messages/${user.id}`, {
      method: "POST",
      data: {
        message,
        reply: reply,
      },
    });
    setMessage("");
    loadMessages();
  };

  const startNewChat = async () => {
    await makeAPICall(`chat/restart/${user.id}`, {
      method: "DELETE",
    });
    loadMessages();
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    isBotOpened && loadMessages();
  }, [isBotOpened]);

  return (
    <>
      <Box
        sx={{
          zIndex: 999,
          position: "fixed",
          right: 40,
          bottom: 40,
          p: 2,
          background: "#d54545",
          borderRadius: "50%",
          cursor: "pointer",
          height: "24px",
        }}
        onClick={() => setIsBotOpened((prev) => !prev)}
      >
        {isBotOpened ? (
          <X size={24} color="white" />
        ) : (
          <Bot size={24} color="white" />
        )}
      </Box>
      <AnimatePresence>
        {isBotOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "linear" }}
            style={{
              position: "fixed",
              right: 40,
              bottom: 105,
              width: "28%",
              zIndex: 999,
            }}
          >
            <Box
              sx={{
                borderRadius: "6px",
                border: "1px solid grey",
              }}
            >
              <Typography
                sx={{
                  background: "#d54545",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: "6px 6px 0 0",
                  px: 2,
                  py: 1,
                  textAlign: "center",
                }}
              >
                Bigbite assistant
              </Typography>
              {messages?.length > 0 && (
                <RefreshCw
                  color="white"
                  size={18}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 10,
                    cursor: "pointer",
                  }}
                  onClick={startNewChat}
                />
              )}
              <Box
                sx={{
                  height: "65vh",
                  background: "white",
                  borderRadius: "0 0 6px 6px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    overflowY: "auto",
                    px: 1,
                    my: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {!messages ? (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar
                        sx={{ width: 28, height: 28 }}
                        src="https://e7.pngegg.com/pngimages/811/700/png-clipart-chatbot-internet-bot-business-natural-language-processing-facebook-messenger-business-people-logo-thumbnail.png"
                      />
                      <Box
                        sx={{
                          background: "#80360059",
                          p: 1,
                          border: "1px solid grey",
                          borderRadius: 2,
                          maxWidth: "78%",
                        }}
                      >
                        <TypeAnimation
                          sequence={[`Hi, I am your assistant to help you.`]}
                          speed={50}
                          style={{ fontSize: "16px" }}
                          cursor={false}
                        />
                      </Box>
                    </Box>
                  ) : (
                    messages?.map((msg: { type: string; message: string }) => (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          flexDirection:
                            msg.type === "bot" ? "row" : "row-reverse",
                        }}
                      >
                        <Avatar
                          sx={{ width: 28, height: 28 }}
                          src={
                            msg.type === "bot"
                              ? "https://e7.pngegg.com/pngimages/811/700/png-clipart-chatbot-internet-bot-business-natural-language-processing-facebook-messenger-business-people-logo-thumbnail.png"
                              : user.image
                          }
                        />
                        <Box
                          sx={{
                            background:
                              msg.type === "bot" ? "#80360059" : "white",
                            p: 1,
                            border: "1px solid grey",
                            borderRadius: 2,
                            maxWidth: "78%",
                          }}
                        >
                          {msg.message}
                        </Box>
                      </Box>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </Box>
                <Box
                  sx={{
                    p: 1,
                    borderTop: "1px solid grey",
                    background: "#8080801f",
                  }}
                >
                  <Input
                    style={{ width: "100%", background: "white" }}
                    placeholder="Enter your message here..."
                    endAdornment={
                      <Send
                        color="#2196f3"
                        style={{
                          cursor:
                            message?.trim()?.length > 2
                              ? "pointer"
                              : "not-allowed",
                          opacity: message?.trim()?.length > 2 ? 1 : 0.5,
                        }}
                      />
                    }
                    bounceTime={0}
                    onDebounce={(message) => setMessage(message)}
                    value={message}
                    isReset
                    onEndClick={sendMessage}
                  />
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIBot;
