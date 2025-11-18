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
import { couponValidationSchema } from "../../utils/schema";
import Input from "../../components/UI/Input";
import toast from "react-hot-toast";

const Coupons = () => {
  const { error, makeAPICall } = useFetch();

  const [allCoupons, setAllCoupons] = useState([]);
  const [open, setOpen] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(-1);

  const fetchCoupons = async () => {
    const res = await makeAPICall(`coupon`, {
      method: "GET",
    });
    setAllCoupons(res?.data);
    setOpen(-1);
    setDeleteOpen(-1);
  };

  const formik = useFormik({
    initialValues: {
      isActive: 0,
      code: "",
      discount: 0,
    },
    validationSchema: couponValidationSchema,
    onSubmit: async (data) => {
      const res = await makeAPICall(open > 0 ? `coupon/${open}` : `coupon`, {
        method: open > 0 ? "PUT" : "POST",
        data,
      });
      if ([200, 201].includes(res?.status)) {
        toast.success(res?.message);
      } else {
        toast.error(error);
      }
      setTimeout(() => {
        fetchCoupons();
      }, 0);
    },
  });

  const handleConfirmDelete = async () => {
    const res = await makeAPICall(`coupon/${deleteOpen}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchCoupons();
    }, 0);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <FullScreenDialog
        title="Coupon"
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
          <InputLabel htmlFor="name" sx={{ fontSize: 14, mb: 0.5 }}>
            Code
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="Enter food name"
            style={{
              width: "100%",
              ".MuiInputBase-input": {
                textTransform: "uppercase !important",
              },
            }}
            required
            isFocused
            value={formik.values.code}
            name="code"
            bounceTime={0}
            error={formik.touched.code && formik.errors.code}
            onDebounce={(code) => formik.setFieldValue("code", code)}
          />
          {formik.touched.code && formik.errors.code && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.code}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <InputLabel htmlFor="discount" sx={{ fontSize: 14, mb: 0.5 }}>
            Discount
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter food discount"
            style={{ width: "100%" }}
            required
            value={formik.values.discount.toString()}
            endAdornment={"%"}
            name="discount"
            bounceTime={0}
            error={formik.touched.discount && formik.errors.discount}
            onDebounce={(discount) =>
              formik.setFieldValue("discount", discount)
            }
          />
          {formik.touched.discount && formik.errors.discount && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.discount}
            </Typography>
          )}
        </Grid>
      </FullScreenDialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
          Coupons
        </Typography>
        <CustomButton
          btnText="New Coupon"
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
        All Coupons are valid based on the terms
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.COUPONS}
        headers={[
          { id: "id", label: "No.", align: "center" },
          { id: "code", label: "Code", align: "left" },
          { id: "discount", label: "Discount (%)", align: "left" },
          { id: "status", label: "Status", align: "center" },
          { id: "actions", label: "Actions", align: "center" },
        ]}
        listData={allCoupons}
        rowsToShow={5}
        handleEdit={async (id: number) => {
          const res = await makeAPICall(`coupon/${id}`, {
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

export default Coupons;
