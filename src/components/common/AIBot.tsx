import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Bot, Send, X } from "lucide-react";
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

  const loadMessages = async () => {
    const response = await axiosInstance.get(`/chat/messages/${user.id}`);
    setMessages(response.data.data.messages);
  };

  const sendMessage = async () => {
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

  useEffect(() => {
    isBotOpened && loadMessages();
  }, [isBotOpened]);

  return (
    <>
      <Box
        sx={{
          zIndex: isBotOpened ? 999 : 0.8,
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
      {isBotOpened && (
        <Box
          sx={{
            zIndex: 999,
            position: "fixed",
            right: 40,
            bottom: 105,
            borderRadius: "6px",
            width: "25%",
            border: "1px solid grey",
          }}
        >
          <Typography
            sx={{
              background: "#d54545",
              color: "white",
              fontWeight: 700,
              fontSize: 20,
              borderRadius: "6px 6px 0 0",
              px: 2,
              py: 1,
            }}
          >
            Big Bot
          </Typography>
          <Box
            sx={{
              height: "50vh",
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
                  <Avatar sx={{ width: 28, height: 28 }} />
                  <Box
                    sx={{
                      background: "#80360059",
                      p: 1,
                      border: "1px solid grey",
                      borderRadius: 2,
                      maxWidth: "200px",
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
                messages?.map(
                  (msg: { type: string; message: string }, index) => (
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
                        src={msg.type === "bot" ? "" : user.image}
                      />
                      <Box
                        sx={{
                          background:
                            msg.type === "bot" ? "#80360059" : "white",
                          p: 1,
                          border: "1px solid grey",
                          borderRadius: 2,
                          maxWidth: "200px",
                        }}
                      >
                        {messages?.length === index + 1 &&
                        msg.type === "bot" ? (
                          <TypeAnimation
                            sequence={[msg.message]}
                            speed={50}
                            style={{ fontSize: "16px", whiteSpace: "pre-line" }}
                            cursor={false}
                          />
                        ) : (
                          msg.message
                        )}
                      </Box>
                    </Box>
                  )
                )
              )}
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
                endAdornment={<Send color="#2196f3" />}
                bounceTime={0}
                onDebounce={(message) => setMessage(message)}
                value={message}
                isReset
                onEndClick={sendMessage}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AIBot;
