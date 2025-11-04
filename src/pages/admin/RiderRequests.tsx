import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import type { IRiderRequest } from "../../types/riderRequest";
import CustomButton from "../../components/UI/Button";
import { BUTTON_VARIANT, STATUS } from "../../enums";
import { Ban, Signature, ThumbsDown, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";

const RiderRequests = () => {
  const { error, makeAPICall } = useFetch();

  const [allRequests, setAllRequests] = React.useState([]);
  const [selected, setSelected] = useState("all");

  const fetchRiderRequests = async () => {
    const res = await makeAPICall("riders", {
      method: "GET",
    });
    setAllRequests(res?.data);
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setSelected(newAlignment);
  };

  const handleRequest = async (id: number, status: string) => {
    const res = await makeAPICall(`riders/${id}`, {
      method: "PUT",
      data: { status },
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchRiderRequests();
    }, 0);
  };

  useEffect(() => {
    fetchRiderRequests();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { md: "row", sm: "row", xs: "column" },
          mb: { md: 0, sm: 0, xs: 2 },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
            Rider Requests
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            All riders willing to join as delivery partners
          </Typography>
        </Box>
        <ToggleButtonGroup
          sx={{ height: "40px" }}
          value={selected}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton sx={{ textTransform: "capitalize" }} value="all">
            All
          </ToggleButton>
          <ToggleButton sx={{ textTransform: "capitalize" }} value="approved">
            Approved
          </ToggleButton>
          <ToggleButton sx={{ textTransform: "capitalize" }} value="rejected">
            Rejected
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {allRequests?.length > 0 ? (
          allRequests
            ?.filter((request: IRiderRequest) => {
              if (selected === "all") return true;
              return request?.status === selected;
            })
            ?.map((request: IRiderRequest) => (
              <Card
                sx={{
                  px: 3,
                  py: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { md: "row", sm: "row", xs: "column" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    src="../../../public/assets/user.jpg"
                    sx={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      alignItems: "start",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                      {request.name}
                    </Typography>
                    <Typography sx={{ color: "grey", fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>City:</span>{" "}
                      <span>{request.city}</span>{" "}
                      <span style={{ color: "black", fontWeight: 600 }}>|</span>{" "}
                      <span style={{ fontWeight: 600 }}>Contact:</span>{" "}
                      <span>{request.contact}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    mt: { md: 0, sm: 0, xs: 1 },
                  }}
                >
                  {request.status === STATUS.PENDING ? (
                    <>
                      <CustomButton
                        btnText="Reject"
                        icon={<ThumbsDown size={18} />}
                        style={{
                          width: "max-content !important",
                        }}
                        onClick={() =>
                          handleRequest(request.id, STATUS.REJECTED)
                        }
                      />
                      <CustomButton
                        btnText="Approve"
                        icon={<ThumbsUp size={18} />}
                        style={{
                          width: "max-content !important",
                          backgroundColor: "green !important",
                        }}
                        onClick={() =>
                          handleRequest(request.id, STATUS.APPROVED)
                        }
                      />
                    </>
                  ) : request.status === STATUS.APPROVED ? (
                    <CustomButton
                      btnText="Approved"
                      variant={BUTTON_VARIANT.OUTLINED}
                      icon={<Signature size={18} />}
                      style={{
                        borderColor: "green !important",
                        color: "green !important",
                      }}
                      disabled
                    />
                  ) : (
                    <CustomButton
                      btnText="Rejected"
                      variant={BUTTON_VARIANT.OUTLINED}
                      icon={<Ban size={18} />}
                      disabled
                    />
                  )}
                </Box>
              </Card>
            ))
        ) : (
          <Typography
            textAlign="center"
            color="grey"
            fontSize={22}
            marginTop={2}
          >
            No Requests found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RiderRequests;
