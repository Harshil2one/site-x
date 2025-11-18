import { useEffect, useState, type ChangeEvent } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { INPUT_SIZE, TABLE_NAME } from "../../enums";
import CustomButton from "../../components/UI/Button";
import { Plus, X } from "lucide-react";
import { useFormik } from "formik";
import { foodValidationSchema } from "../../utils/schema";
import DeletePopup from "../../components/UI/DeletePopup";
import FullScreenDialog from "../../components/UI/FullScreenModal";
import Input from "../../components/UI/Input";
import toast from "react-hot-toast";

const Foods = () => {
  const { error, setError, makeAPICall } = useFetch();

  const [allFoods, setAllFoods] = useState([]);
  const [open, setOpen] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(-1);
  const [image, setImage] = useState<string | null>(null);

  const fetchFoods = async () => {
    const res = await makeAPICall(`foods`, {
      method: "GET",
    });
    setAllFoods(res?.data);
    setOpen(-1);
    setDeleteOpen(-1);
  };

  const formik = useFormik({
    initialValues: {
      type: "veg",
      isBest: 0,
      name: "",
      description: "",
      price: 0,
    },
    validationSchema: foodValidationSchema,
    onSubmit: async (values) => {
      if (!image) return;
      const res = await makeAPICall(open > 0 ? `foods/${open}` : `foods`, {
        method: open > 0 ? "PUT" : "POST",
        data: { ...values, image: image ? image : null },
      });
      if ([200, 201].includes(res?.status)) {
        toast.success(res?.message);
      } else {
        toast.error(error);
      }
      setTimeout(() => {
        fetchFoods();
      }, 0);
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setError("");

      const sizeInMB = file.size / (1024 * 1024);
      if (Math.floor(sizeInMB) > 10) {
        setError("Image size exceeds 10MB. Please choose a smaller file.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelete = async () => {
    const res = await makeAPICall(`foods/${deleteOpen}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchFoods();
    }, 0);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <FullScreenDialog
        title="Food"
        open={open}
        setOpen={setOpen}
        handleSave={formik.handleSubmit}
      >
        <Grid size={{ md: 3, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="images" sx={{ fontSize: 14, mb: 0.5 }}>
            Food Image <span style={{ color: "red" }}>*</span>
          </InputLabel>
          {image && error && (
            <Typography
              sx={{
                px: 1,
                pt: 0.5,
                color: "red",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {image && (
              <Box
                sx={{
                  position: "relative",
                  width: 90,
                  height: 90,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "2px solid #e0e0e0",
                }}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                <IconButton
                  size="small"
                  onClick={() => setImage("")}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Box>
            )}
            {!image && (
              <label
                htmlFor="file-upload"
                style={{
                  width: 90,
                  height: 90,
                  border: "2px dashed #9e9e9e",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexDirection: "column",
                  color: "#757575",
                }}
              >
                <Plus size={24} />
                <Typography variant="caption">Upload</Typography>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </Box>
        </Grid>
        <Grid
          size={{ md: 4.5, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "red", fontWeight: 600 }}>
              Non-veg
            </Typography>
            <Switch
              color="success"
              name="type"
              checked={formik.values.type === "veg"}
              onChange={(e) =>
                formik.setFieldValue(
                  "type",
                  e.target.checked ? "veg" : "nonVeg"
                )
              }
            />
            <Typography sx={{ color: "green", fontWeight: 600 }}>
              Veg
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={{ md: 4.5, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Switch
              color="warning"
              name="isBest"
              checked={formik.values.isBest === 1}
              onChange={(e) =>
                formik.setFieldValue("isBest", e.target.checked ? 1 : 0)
              }
            />
            <Typography sx={{ fontWeight: 600 }}>BestSeller</Typography>
          </Stack>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <InputLabel htmlFor="name" sx={{ fontSize: 14, mb: 0.5 }}>
            Name
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="Enter food name"
            style={{ width: "100%" }}
            required
            isFocused
            value={formik.values.name}
            name="name"
            bounceTime={0}
            error={formik.touched.name && formik.errors.name}
            onDebounce={(name) => formik.setFieldValue("name", name)}
          />
          {formik.touched.name && formik.errors.name && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.name}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <InputLabel htmlFor="price" sx={{ fontSize: 14, mb: 0.5 }}>
            Price
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter food price"
            style={{ width: "100%" }}
            required
            value={formik.values.price.toString()}
            startAdornment={"₹"}
            name="price"
            bounceTime={0}
            error={formik.touched.price && formik.errors.price}
            onDebounce={(price) => formik.setFieldValue("price", price)}
          />
          {formik.touched.price && formik.errors.price && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.price}
            </Typography>
          )}
        </Grid>

        <Grid size={12}>
          <InputLabel htmlFor="description" sx={{ fontSize: 14, mb: 0.5 }}>
            Description
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter food description"
            style={{ width: "100%" }}
            multiline
            required
            value={formik.values.description}
            name="description"
            bounceTime={0}
            error={formik.touched.description && formik.errors.description}
            onDebounce={(description) =>
              formik.setFieldValue("description", description)
            }
          />
          {formik.touched.description && formik.errors.description && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.description}
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
          Foods
        </Typography>
        <CustomButton
          btnText="New Food"
          icon={<Plus size={18} />}
          style={{
            width: "max-content",
          }}
          onClick={() => {
            setImage(null);
            setOpen(0);
            formik.resetForm();
          }}
        />
      </Box>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        All Foods are listed with required details
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.FOODS}
        headers={[
          { id: "name", label: "Name", align: "left" },
          { id: "description", label: "Description", align: "left" },
          { id: "price", label: "Price", align: "left" },
          { id: "type", label: "Food Type", align: "center" },
          { id: "ratings", label: "Ratings", align: "center" },
          { id: "actions", label: "Actions", align: "center" },
        ]}
        listData={allFoods}
        handleEdit={async (id: number) => {
          setImage(null);
          const res = await makeAPICall(`foods/${id}`, {
            method: "GET",
          });
          formik.setValues(res?.data);
          setImage(res?.data?.image);
          setOpen(id);
        }}
        handleDelete={(id: number) => setDeleteOpen(id)}
      />
    </Box>
  );
};

export default Foods;
