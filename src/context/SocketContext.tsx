import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import socketService from "../utils/socketService";

interface SocketContextType {
  isConnected: boolean;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
  url: string;
}

export const SocketProvider = ({ children, url }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  useEffect(() => {
    // Connect to socket
    socketService.connect(url);

    // Set up connection status listener
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.on("connect", handleConnect);
    socketService.on("disconnect", handleDisconnect);

    // Cleanup on unmount
    return () => {
      socketService.off("connect");
      socketService.off("disconnect");
      socketService.disconnect();
    };
  }, [url]);

  // Update user ID when it changes
  useEffect(() => {
    if (user?.id) {
      socketService.setUserId(user.id);
    }
  }, [user?.id]);

  const value = {
    isConnected,
    emit: socketService.emit.bind(socketService),
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
