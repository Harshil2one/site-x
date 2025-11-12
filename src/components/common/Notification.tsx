import React, { useEffect, useState } from "react";
import { Bell, CheckCheck, EyeOff } from "lucide-react";
import {
  Badge,
  Button,
  Popover,
  Typography,
  Box,
  IconButton,
  type SxProps,
  type Theme,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { type INotification } from "../../types/notifications";
import socketService from "../../utils/socketService";

interface IProps {
  style?: SxProps<Theme>;
}

const Notification = ({ style }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const open = Boolean(anchorEl);

  const { makeAPICall } = useFetch();
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNotifications = async () => {
    const res = await makeAPICall(`notification/${user?.id}`, {
      method: "GET",
    });
    setNotifications(res?.data);
  };

  const handleMarkAsRead = async (id: number) => {
    await makeAPICall(`notification/mark-as-read/${id}`, {
      method: "GET",
    });
    setTimeout(() => {
      fetchNotifications();
    }, 0);
  };

  const handleMarkAllAsRead = async () => {
    await makeAPICall(`notification/mark-as-read/${user?.id}`, {
      method: "DELETE",
    });
    setTimeout(() => {
      fetchNotifications();
    }, 0);
  };

  useEffect(() => {
    if (user?.id) fetchNotifications();
  }, []);

  useEffect(() => {
    socketService.on("receive_notification", (payload) => {
      setNotifications((prev) => [payload as INotification, ...prev]);
    });

    return () => {
      socketService.off("receive_notification");
    };
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...style }}>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "black",
          "&:hover": {
            background: "transparent",
          },
        }}
      >
        <Badge variant="dot" color="error" invisible={!notifications?.length}>
          <Bell size={20} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: { p: 2, width: 320, borderRadius: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1">
            Notifications ({notifications?.length || 0})
          </Typography>

          {notifications?.length > 0 && (
            <Button
              size="small"
              color="primary"
              onClick={handleMarkAllAsRead}
              startIcon={<CheckCheck size={14} />}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        <Box
          sx={{
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          {notifications?.length > 0 ? (
            notifications?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  p: 1.2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{item.message}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleMarkAsRead(item.id)}
                  >
                    <EyeOff size={14} />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    mt: 0.5,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {moment(item.created_at * 1000).fromNow()}
                  </Typography>
                  {item.link && (
                    <Link
                      to={item.link}
                      style={{ fontSize: 12, textDecoration: "underline" }}
                    >
                      See details
                    </Link>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Notification;
