import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { INPUT_SIZE, TABLE_NAME } from "../../enums";
import CustomButton from "../../components/UI/Button";
import { Plus } from "lucide-react";
import { useFormik } from "formik";
import DeletePopup from "../../components/UI/DeletePopup";
import FullScreenDialog from "../../components/UI/FullScreenModal";
import { jobValidationSchema } from "../../utils/schema";
import Input from "../../components/UI/Input";
import toast from "react-hot-toast";

const Jobs = () => {
  const { error, makeAPICall } = useFetch();

  const [allJobs, setAllJobs] = useState([]);
  const [open, setOpen] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(-1);

  const fetchJobs = async () => {
    const res = await makeAPICall(`jobs`, {
      method: "GET",
    });
    setAllJobs(res?.data);
    setOpen(-1);
    setDeleteOpen(-1);
  };

  const formik = useFormik({
    initialValues: {
      isActive: 0,
      title: "",
      location: "Ahmedabad",
    },
    validationSchema: jobValidationSchema,
    onSubmit: async (data) => {
      const res = await makeAPICall(open > 0 ? `jobs/${open}` : `jobs`, {
        method: open > 0 ? "PUT" : "POST",
        data,
      });
      if ([200, 201].includes(res?.status)) {
        toast.success(res?.message);
      } else {
        toast.error(error);
      }
      setTimeout(() => {
        fetchJobs();
      }, 0);
    },
  });

  const handleConfirmDelete = async () => {
    const res = await makeAPICall(`jobs/${deleteOpen}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchJobs();
    }, 0);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <FullScreenDialog
        title="Job"
        open={open}
        setOpen={setOpen}
        handleSave={formik.handleSubmit}
      >
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "red", fontWeight: 600 }}>
              In-active
            </Typography>
            <Switch
              color="success"
              name="isActive"
              checked={formik.values.isActive === 1}
              onChange={(e) =>
                formik.setFieldValue("isActive", e.target.checked ? 1 : 0)
              }
            />
            <Typography sx={{ color: "green", fontWeight: 600 }}>
              Active
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <InputLabel htmlFor="title" sx={{ fontSize: 14, mb: 0.5 }}>
            Title
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="Enter job title"
            style={{
              width: "100%",
            }}
            required
            isFocused
            isReset
            value={formik.values.title}
            name="title"
            bounceTime={0}
            error={formik.touched.title && formik.errors.title}
            onDebounce={(title) => formik.setFieldValue("title", title)}
          />
          {formik.touched.title && formik.errors.title && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.title}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <InputLabel htmlFor="location" sx={{ fontSize: 14, mb: 0.5 }}>
            Location
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="Enter job location"
            style={{ width: "100%" }}
            value={formik.values.location.toString()}
            isReset
            name="location"
            disabled
          />
        </Grid>
      </FullScreenDialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>Jobs</Typography>
        <CustomButton
          btnText="New Job"
          icon={<Plus size={18} />}
          style={{
            width: "max-content",
          }}
          onClick={() => {
            setOpen(0);
            formik.resetForm();
          }}
        />
      </Box>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        All Jobs with open positions
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.JOBS}
        headers={[
          { id: "id", label: "No.", align: "center" },
          { id: "title", label: "Title", align: "center" },
          { id: "location", label: "Location", align: "center" },
          { id: "status", label: "Status", align: "center" },
          { id: "actions", label: "Actions", align: "center" },
        ]}
        listData={allJobs}
        rowsToShow={5}
        handleEdit={async (id: number) => {
          const res = await makeAPICall(`jobs/${id}`, {
            method: "GET",
          });
          formik.setValues(res?.data);
          setOpen(id);
        }}
        handleDelete={(id: number) => setDeleteOpen(id)}
      />
    </Box>
  );
};

export default Jobs;
