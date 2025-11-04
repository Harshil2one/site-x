import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { TABLE_NAME } from "../../enums";

const Orders = () => {
  const { makeAPICall } = useFetch();

  const [allOrders, setAllOrders] = React.useState([]);

  const fetchOrders = async () => {
    const res = await makeAPICall(`orders`, {
      method: "GET",
    });
    setAllOrders(res?.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <Box>
        <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
          Orders
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          All Orders placed by any customers
        </Typography>
      </Box>

      <CommonTable
        tableName={TABLE_NAME.ORDERS}
        headers={[
          { id: "order_id", label: "Order ID", align: "left" },
          { id: "restaurant-name", label: "Restaurant Name", align: "left" },
          { id: "order-items", label: "Order Items", align: "left" },
          { id: "amount", label: "Amount(₹)", align: "center" },
          { id: "order-status", label: "Status", align: "center" },
        ]}
        listData={allOrders}
        rowsToShow={allOrders?.length}
        isPagination={false}
      />
    </Box>
  );
};

export default Orders;
