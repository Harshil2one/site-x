import React, { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import CustomButton from "./Button";
import {
  BUTTON_VARIANT,
  RESTAURANT_TYPE,
  STATUS,
  TABLE_NAME,
} from "../../enums";
import { Pencil, Star, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import type { IRestaurant } from "../../types/restaurant";

interface IHeader {
  id: string;
  label: string;
  align: "left" | "center" | "right";
}

interface IProps {
  tableName: TABLE_NAME;
  headers: IHeader[];
  listData: any[];
  restaurant?: IRestaurant;
  rowsToShow?: number;
  isPagination?: boolean;
  handleNameClick?: (id: number) => void;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
}

const CommonTable = (props: IProps) => {
  const {
    tableName,
    headers,
    listData,
    restaurant = {} as IRestaurant,
    rowsToShow = 10,
    isPagination = true,
    handleNameClick,
    handleEdit,
    handleDelete,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <TableContainer sx={{ border: "2px solid #d54545", borderRadius: 1 }}>
        <Table size="small">
          <TableHead sx={{ background: "#d54545" }}>
            <TableRow>
              {headers?.map((header) => (
                <TableCell
                  align={header.align}
                  key={header.id}
                  sx={{ fontWeight: 600, color: "white" }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData?.length > 0 ? (
              listData
                .slice(currentPage * rowsToShow, rowsToShow * (currentPage + 1))
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      backgroundColor:
                        tableName === TABLE_NAME.RESTAURANTS
                          ? row.type === RESTAURANT_TYPE.VEG
                            ? "#00ff1a0d"
                            : "#ff00000d"
                          : "",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {headers?.map((header) => {
                      if (header.id === "isSpecial") {
                        return (
                          <TableCell align="center" key={header.id}>
                            {row?.isSpecial === 1 && (
                              <Star fill="orange" size={16} color="orange" />
                            )}
                          </TableCell>
                        );
                      } else if (header.id === "isBest") {
                        return (
                          <TableCell align="center" key={header.id}>
                            {row?.isBest === 1 && (
                              <Typography
                                sx={{
                                  color: "#FF6E5A",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  textDecoration: "underline",
                                }}
                              >
                                Bestseller
                              </Typography>
                            )}
                          </TableCell>
                        );
                      } else if (header.id === "name") {
                        return (
                          <TableCell align="left" key={header.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              {tableName === TABLE_NAME.USERS ? (
                                <Avatar
                                  src={row.image}
                                  sx={{
                                    width: 45,
                                    height: 45,
                                  }}
                                />
                              ) : (
                                <img
                                  src={
                                    tableName === TABLE_NAME.RESTAURANTS
                                      ? row.images?.[0]
                                      : row.image
                                  }
                                  alt={row[header.id]}
                                  style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: "4px",
                                    objectFit: "cover",
                                  }}
                                  loading="lazy"
                                />
                              )}
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    color: handleNameClick ? "navy" : "",
                                    fontSize: 14,
                                    cursor: handleNameClick ? "pointer" : "",
                                  }}
                                  onClick={() =>
                                    handleNameClick && handleNameClick(row.id)
                                  }
                                >
                                  {row[header.id]}
                                </Typography>
                                {tableName === TABLE_NAME.FOODS && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <img
                                      src={`../../../public/assets/${
                                        row.type === RESTAURANT_TYPE.VEG
                                          ? "veg-icon.png"
                                          : "non-veg-icon.png"
                                      }`}
                                      alt={row.type}
                                      style={{
                                        width: 12,
                                        height: 12,
                                      }}
                                      loading="lazy"
                                    />
                                    {row?.isBest === 1 && (
                                      <Typography
                                        sx={{
                                          color: "#FF6E5A",
                                          fontWeight: 600,
                                          fontSize: "12px",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        Bestseller
                                      </Typography>
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                        );
                      } else if (header.id === "special") {
                        return (
                          <TableCell align={header.align}>
                            {row?.[header.id]?.join(", ")}
                          </TableCell>
                        );
                      } else if (header.id === "mode" || header.id === "type") {
                        return (
                          <TableCell
                            align={header.align}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {row[header.id]}
                          </TableCell>
                        );
                      } else if (header.id === "status") {
                        return (
                          <TableCell align={header.align}>
                            <Chip
                              color={row.isActive ? "success" : "error"}
                              label={row.isActive ? "Active" : "In-active"}
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                        );
                      } else if (header.id === "role") {
                        return (
                          <TableCell align={header.align}>
                            {row[header.id] === 1
                              ? "Admin"
                              : row[header.id] === 2
                              ? "Customer"
                              : row[header.id] === 3
                              ? "Delivery Partner"
                              : "Restaurant Owner"}
                          </TableCell>
                        );
                      } else if (header.id === "restaurant-name") {
                        return (
                          <TableCell align={header.align}>
                            {row?.restaurant?.name}
                          </TableCell>
                        );
                      } else if (header.id === "order-items") {
                        return (
                          <TableCell align={header.align}>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              {row?.food?.map((f: any) => (
                                <span>{f.count + " x " + f.name}</span>
                              ))}
                            </Box>
                          </TableCell>
                        );
                      } else if (header.id === "order-status") {
                        return (
                          <TableCell align={header.align}>
                            <Chip
                              color={
                                row.payment_status === "paid"
                                  ? "success"
                                  : row.payment_status === "failed"
                                  ? "error"
                                  : "default"
                              }
                              label={row.payment_status}
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                        );
                      } else if (header.id === "actions") {
                        return (
                          <TableCell align="center" key={header.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              <CustomButton
                                btnText="Edit"
                                variant={BUTTON_VARIANT.OUTLINED}
                                style={{
                                  width: "max-content",
                                  borderColor: "green !important",
                                  color: "green !important",
                                  fontWeight: 500,
                                }}
                                icon={<Pencil size={18} />}
                                onClick={() => handleEdit && handleEdit(row.id)}
                              />
                              <CustomButton
                                btnText="Remove"
                                variant={BUTTON_VARIANT.OUTLINED}
                                style={{
                                  width: "max-content",
                                }}
                                icon={<Trash2 size={18} />}
                                onClick={() =>
                                  handleDelete && handleDelete(row.id)
                                }
                              />
                            </Box>
                          </TableCell>
                        );
                      } else if (header.id === "restaurant-actions") {
                        return (
                          <TableCell align="center" key={header.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              {row.status === STATUS.PENDING ? (
                                <>
                                  <CustomButton
                                    btnText="Reject"
                                    icon={<ThumbsDown size={18} />}
                                    style={{
                                      width: "max-content !important",
                                    }}
                                    onClick={() =>
                                      handleDelete && handleDelete(row.id)
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
                                      handleEdit && handleEdit(row.id)
                                    }
                                  />
                                </>
                              ) : row.status === STATUS.APPROVED ? (
                                <CustomButton
                                  btnText="Approved"
                                  variant={BUTTON_VARIANT.OUTLINED}
                                  style={{
                                    borderColor: "green !important",
                                    color: "green !important",
                                  }}
                                  onClick={() =>
                                    handleDelete && handleDelete(row.id)
                                  }
                                />
                              ) : (
                                <CustomButton
                                  btnText="Rejected"
                                  variant={BUTTON_VARIANT.OUTLINED}
                                  onClick={() =>
                                    handleEdit && handleEdit(row.id)
                                  }
                                />
                              )}
                            </Box>
                          </TableCell>
                        );
                      } else if (header.id === "food-actions") {
                        return (
                          <TableCell align="center" key={header.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              {!restaurant?.food?.includes(row?.id) ? (
                                <CustomButton
                                  btnText="Add"
                                  icon={<ThumbsUp size={18} />}
                                  style={{
                                    width: "max-content !important",
                                    backgroundColor: "green !important",
                                  }}
                                  onClick={() =>
                                    handleEdit && handleEdit(row.id)
                                  }
                                />
                              ) : (
                                <CustomButton
                                  btnText="Remove"
                                  icon={<ThumbsDown size={18} />}
                                  style={{
                                    width: "max-content !important",
                                  }}
                                  onClick={() =>
                                    handleDelete && handleDelete(row.id)
                                  }
                                />
                              )}
                            </Box>
                          </TableCell>
                        );
                      } else if (header.id === "delete") {
                        return (
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            key={header.id}
                          >
                            <CustomButton
                              btnText="Remove"
                              variant={BUTTON_VARIANT.OUTLINED}
                              style={{
                                width: "max-content",
                              }}
                              icon={<Trash2 size={18} />}
                              onClick={() =>
                                handleDelete && handleDelete(row.id)
                              }
                            />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell align={header.align}>
                          {row[header.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers?.length}
                  align="center"
                  sx={{ color: "grey" }}
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={listData?.length}
          rowsPerPage={rowsToShow}
          page={currentPage}
          onPageChange={(_event, page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default CommonTable;
