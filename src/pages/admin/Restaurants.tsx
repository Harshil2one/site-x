import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { INPUT_SIZE, PUBLIC_ROUTE, TABLE_NAME } from "../../enums";
import CustomButton from "../../components/UI/Button";
import { Plus, X } from "lucide-react";
import { useFormik } from "formik";
import FullScreenDialog from "../../components/UI/FullScreenModal";
import Input from "../../components/UI/Input";
import { restaurantValidationSchema } from "../../utils/schema";
import DeletePopup from "../../components/UI/DeletePopup";
import type { IFood } from "../../types/food";
import toast from "react-hot-toast";

const Restaurants = () => {
  const navigate = useNavigate();

  const { error, setError, makeAPICall } = useFetch();

  const [allRestaurants, setAllRestaurants] = React.useState([]);
  const [allFoods, setAllFoods] = React.useState([]);
  const [open, setOpen] = React.useState(-1);
  const [deleteOpen, setDeleteOpen] = React.useState(-1);
  const [images, setImages] = React.useState<string[]>([]);

  const fetchRestaurants = async () => {
    const res = await makeAPICall(`restaurants`, {
      method: "GET",
    });
    setAllRestaurants(res?.data);
    setImages([]);
    setOpen(-1);
    setDeleteOpen(-1);
  };

  const fetchFoods = async () => {
    const res = await makeAPICall(`foods`, {
      method: "GET",
    });
    setAllFoods(res?.data);
  };

  const formik = useFormik({
    initialValues: {
      type: "veg",
      isSpecial: 0,
      name: "",
      email: "",
      contact: "",
      address: "",
      offers: "",
      food: [],
      special: "",
      rate: 0,
      time: "",
      mode: "online",
      distance: 0.0,
      bankOffers: "",
    },
    validationSchema: restaurantValidationSchema,
    onSubmit: async (values) => {
      if (images?.length === 0) return;
      const offers = values?.offers?.includes(",")
        ? values.offers?.split(",").map((item) => item.trim())
        : open > 0
        ? values.offers
        : [values.offers];

      const special = values?.special?.includes(",")
        ? values.special?.split(",").map((item) => item.trim())
        : open > 0
        ? values.special
        : [values.special];
      const food = [...new Set(values.food)];
      const res = await makeAPICall(
        open > 0 ? `restaurants/${open}` : `restaurants`,
        {
          method: open > 0 ? "PUT" : "POST",
          data: {
            ...values,
            food,
            offers,
            special,
            images,
          },
        }
      );
      if ([200, 201].includes(res?.status)) {
        toast.success(res?.message);
      } else {
        toast.error(error);
      }
      setTimeout(() => {
        fetchRestaurants();
      }, 0);
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = Array.from(e.target.files || []);
    const totalFiles = images.length + files.length;

    if (totalFiles > 4) {
      setError("You can upload a maximum of 4 images.");
      return;
    }

    files.map((file) => {
      const sizeInMB = file.size / (1024 * 1024);
      if (Math.floor(sizeInMB) > 10) {
        setError("Image size exceeds 10MB. Please choose a another one.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages((prev) => [...prev, base64String]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirmDelete = async () => {
    const res = await makeAPICall(`restaurants/${deleteOpen}`, {
      method: "DELETE",
    });
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(error);
    }
    setTimeout(() => {
      fetchRestaurants();
    }, 0);
  };

  useEffect(() => {
    fetchRestaurants();
    fetchFoods();
  }, []);

  return (
    <Box sx={{ py: 3 }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <FullScreenDialog
        title="Restaurant"
        fullScreen
        open={open}
        setOpen={setOpen}
        handleSave={formik.handleSubmit}
      >
        <Grid
          size={{ md: 3, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "red", fontWeight: 600 }}>
              Non-veg
            </Typography>
            <Switch
              color="success"
              name="type"
              defaultChecked={formik.values.type === "veg"}
              onChange={(e) =>
                formik.setFieldValue(
                  "type",
                  e.target.checked ? "veg" : "non-veg"
                )
              }
            />
            <Typography sx={{ color: "green", fontWeight: 600 }}>
              Veg
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={{ md: 3, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Switch
              color="warning"
              name="isSpecial"
              defaultChecked={formik.values.isSpecial === 1}
              onChange={(e) =>
                formik.setFieldValue("isSpecial", e.target.checked ? 1 : 0)
              }
            />
            <Typography sx={{ fontWeight: 600 }}>Special</Typography>
          </Stack>
        </Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <InputLabel htmlFor="images" sx={{ fontSize: 14, mb: 0.5 }}>
            Restaurant Images <span style={{ color: "red" }}>*</span>
          </InputLabel>
          {images?.length > 0 && error && (
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
            {images?.map((img, index) => (
              <Box
                key={index}
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
                  src={img}
                  alt={formik.values.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
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
            ))}
            {images?.length < 4 && (
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

        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="name" sx={{ fontSize: 14, mb: 0.5 }}>
            Name
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="Enter restaurant name"
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
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="email" sx={{ fontSize: 14, mb: 0.5 }}>
            Email
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter restaurant email"
            style={{ width: "100%" }}
            required
            value={formik.values.email}
            name="email"
            bounceTime={0}
            error={formik.touched.email && formik.errors.email}
            onDebounce={(email) => formik.setFieldValue("email", email)}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.email}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="contact" sx={{ fontSize: 14, mb: 0.5 }}>
            Contact
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter restaurant contact"
            style={{ width: "100%" }}
            required
            value={formik.values.contact}
            name="contact"
            bounceTime={0}
            error={formik.touched.contact && formik.errors.contact}
            onDebounce={(contact) => formik.setFieldValue("contact", contact)}
          />
          {formik.touched.contact && formik.errors.contact && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.contact}
            </Typography>
          )}
        </Grid>

        <Grid size={12}>
          <InputLabel htmlFor="address" sx={{ fontSize: 14, mb: 0.5 }}>
            Address
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter restaurant address"
            style={{ width: "100%" }}
            multiline
            required
            value={formik.values.address}
            name="address"
            bounceTime={0}
            error={formik.touched.address && formik.errors.address}
            onDebounce={(address) => formik.setFieldValue("address", address)}
          />
          {formik.touched.address && formik.errors.address && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.address}
            </Typography>
          )}
        </Grid>

        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="offers" sx={{ fontSize: 14, mb: 0.5 }}>
            Offers
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter offers using , separators"
            style={{ width: "100%" }}
            value={formik.values.offers}
            name="offers"
            bounceTime={0}
            error={formik.touched.offers && formik.errors.offers}
            onDebounce={(offers) => formik.setFieldValue("offers", offers)}
          />
          {formik.touched.offers && formik.errors.offers && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.offers}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="food" sx={{ fontSize: 14, mb: 0.5 }}>
            Food Options
          </InputLabel>
          <Select
            multiple
            value={formik.values.food}
            onChange={(event) =>
              formik.setFieldValue("food", [
                ...formik.values.food,
                ...event.target.value,
              ])
            }
            error={formik.touched.food && (formik.errors.food as any)}
            displayEmpty
            sx={{
              height: "40px",
              width: "100%",
              fontSize: "0.8rem !important",
            }}
          >
            {allFoods?.map((option: IFood, index) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    display: index === 0 ? "none" : "",
                    fontWeight: (formik.values.food as any).includes(option.id)
                      ? 600
                      : 500,
                  }}
                  value={option.id}
                >
                  {option.name}
                </MenuItem>
              );
            })}
          </Select>
          {formik.touched.food && formik.errors.food && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.food}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="special" sx={{ fontSize: 14, mb: 0.5 }}>
            Special Foods
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter special foods using , separators"
            style={{ width: "100%" }}
            required
            value={formik.values.special}
            name="special"
            bounceTime={0}
            error={formik.touched.special && formik.errors.special}
            onDebounce={(special) => formik.setFieldValue("special", special)}
          />
          {formik.touched.special && formik.errors.special && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.special}
            </Typography>
          )}
        </Grid>

        <Grid size={{ md: 3, sm: 6 }}>
          <InputLabel htmlFor="rate" sx={{ fontSize: 14, mb: 0.5 }}>
            Rate
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter restaurant avg. rate"
            style={{ width: "100%" }}
            required
            value={formik.values.rate.toString()}
            startAdornment={"₹"}
            name="rate"
            bounceTime={0}
            error={formik.touched.rate && formik.errors.rate}
            onDebounce={(rate) => formik.setFieldValue("rate", rate)}
          />
          {formik.touched.rate && formik.errors.rate && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.rate}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 3, sm: 6 }}>
          <InputLabel htmlFor="time" sx={{ fontSize: 14, mb: 0.5 }}>
            Time
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter waiting time"
            style={{ width: "100%" }}
            required
            value={formik.values.time}
            endAdornment="mins"
            name="time"
            bounceTime={0}
            error={formik.touched.time && formik.errors.time}
            onDebounce={(time) => formik.setFieldValue("time", time)}
          />
          {formik.touched.time && formik.errors.time && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.time}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 3, sm: 6 }}>
          <InputLabel htmlFor="mode" sx={{ fontSize: 14, mb: 0.5 }}>
            Mode
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="select restaurant mode"
            style={{ width: "100%" }}
            required
            value={formik.values.mode}
            name="mode"
            bounceTime={0}
            error={formik.touched.mode && formik.errors.mode}
            onDebounce={(mode) => formik.setFieldValue("mode", mode)}
          />
          {formik.touched.mode && formik.errors.mode && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.mode}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 3, sm: 6 }}>
          <InputLabel htmlFor="distance" sx={{ fontSize: 14, mb: 0.5 }}>
            Distance
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter avg. distance"
            style={{ width: "100%" }}
            required
            value={formik.values.distance.toString()}
            endAdornment={"km"}
            name="distance"
            bounceTime={0}
            error={formik.touched.distance && formik.errors.distance}
            onDebounce={(distance) =>
              formik.setFieldValue("distance", distance)
            }
          />
          {formik.touched.distance && formik.errors.distance && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.distance}
            </Typography>
          )}
        </Grid>

        <Grid size={12}>
          <InputLabel htmlFor="bankOffers" sx={{ fontSize: 14, mb: 0.5 }}>
            Bank Offer
          </InputLabel>
          <Input
            size={INPUT_SIZE.SMALL}
            placeholder="enter restaurant bank offer"
            style={{ width: "100%" }}
            value={formik.values.bankOffers}
            name="bankOffers"
            bounceTime={0}
            error={formik.touched.bankOffers && formik.errors.bankOffers}
            onDebounce={(bankOffers) =>
              formik.setFieldValue("bankOffers", bankOffers)
            }
          />
          {formik.touched.bankOffers && formik.errors.bankOffers && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.bankOffers}
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
        <Box>
          <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
            Restaurants
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            All Restaurants are listed with required details
          </Typography>
        </Box>
        <CustomButton
          btnText="New Restaurant"
          icon={<Plus size={18} />}
          style={{
            width: "max-content",
          }}
          onClick={() => {
            setOpen(0);
            setImages([]);
            formik.resetForm();
          }}
        />
      </Box>
      <CommonTable
        tableName={TABLE_NAME.RESTAURANTS}
        headers={[
          { id: "isSpecial", label: "Sp.", align: "center" },
          { id: "name", label: "Name", align: "left" },
          { id: "address", label: "Address", align: "left" },
          { id: "special", label: "Special Dishes", align: "left" },
          { id: "time", label: "Waiting Time", align: "center" },
          { id: "mode", label: "Service Mode", align: "center" },
          { id: "ratings", label: "Ratings", align: "center" },
          { id: "actions", label: "Actions", align: "center" },
        ]}
        listData={allRestaurants}
        handleNameClick={(id: number) =>
          navigate(`${PUBLIC_ROUTE.RESTAURANT}/${id}`)
        }
        handleEdit={async (id: number) => {
          const res = await makeAPICall(`restaurants/${id}`, {
            method: "GET",
          });
          formik.setValues(res?.data);
          setImages(res?.data?.images);
          setOpen(id);
        }}
        handleDelete={(id: number) => setDeleteOpen(id)}
      />
    </Box>
  );
};

export default Restaurants;
