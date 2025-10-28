import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { TABLE_NAME } from "../../enums";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import DeletePopup from "../../components/UI/DeletePopup";
import toast from "react-hot-toast";

const Users = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { error, makeAPICall } = useFetch();

  const [allUsers, setAllUsers] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(-1);

  const fetchUsers = async () => {
    const res = await makeAPICall(`auth/${user?.id}`, {
      method: "GET",
    });
    setAllUsers(res?.data);
    setDeleteOpen(-1);
  };

  const handleConfirmDelete = async () => {
    const res = await makeAPICall(`auth/${deleteOpen}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchUsers();
    }, 0);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ py: 3 }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <Box>
        <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
          Users
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          All Users whoever is using application
        </Typography>
      </Box>

      <CommonTable
        tableName={TABLE_NAME.USERS}
        headers={[
          { id: "id", label: "No.", align: "center" },
          { id: "name", label: "Name", align: "left" },
          { id: "email", label: "Email", align: "left" },
          { id: "contact", label: "Contact", align: "center" },
          { id: "isAdmin", label: "Role", align: "center" },
          { id: "delete", label: "Actions", align: "center" },
        ]}
        listData={allUsers}
        rowsToShow={allUsers?.length}
        isPagination={false}
        handleDelete={(id: number) => setDeleteOpen(id)}
      />
    </Box>
  );
};

export default Users;
