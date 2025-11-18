import { useEffect, useState, type ChangeEvent } from "react";
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
import useFetch from "../../hooks/useFetch";
import { BUTTON_VARIANT, INPUT_SIZE } from "../../enums";
import { Plus, X } from "lucide-react";
import { useFormik } from "formik";
import Input from "../../components/UI/Input";
import { restaurantValidationSchema } from "../../utils/schema";
import DeletePopup from "../../components/UI/DeletePopup";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { IRestaurant } from "../../types/restaurant.ts";
import CustomButton from "../../components/UI/Button";
import socketService from "../../utils/socketService";

const OwnerPage = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { error, setError, makeAPICall } = useFetch();

  const [restaurantDetails, setRestaurantDetails] = useState({} as IRestaurant);
  const [deleteOpen, setDeleteOpen] = useState(-1);
  const [images, setImages] = useState<string[]>([]);

  const fetchRestaurants = async () => {
    const res = await makeAPICall(`restaurants?created_by=${user.id}`, {
      method: "GET",
    });
    const restaurantDetails = res?.data?.[0];
    setRestaurantDetails(restaurantDetails);
    formik.setValues({
      open: restaurantDetails?.open,
      type: restaurantDetails?.type,
      isSpecial: restaurantDetails?.isSpecial || 0,
      name: restaurantDetails?.name || "",
      email: restaurantDetails?.email || "",
      contact: restaurantDetails?.contact || "",
      address: restaurantDetails?.address || "",
      offers: restaurantDetails?.offers || "",
      special: restaurantDetails?.special || "",
      rate: restaurantDetails?.rate || 0,
      time: restaurantDetails?.time || "",
      mode: restaurantDetails?.mode || "online",
      distance: restaurantDetails?.distance || 0.0,
      bankOffers: restaurantDetails?.bankOffers || "",
      images: restaurantDetails?.images || [],
    });
    setImages(restaurantDetails?.images);
    setDeleteOpen(-1);
  };

  const formik = useFormik({
    initialValues: {
      open: 0,
      type: "veg",
      isSpecial: 0,
      name: "",
      email: "",
      contact: "",
      address: "",
      offers: "",
      special: "",
      rate: 0,
      time: "",
      mode: "online",
      distance: 0.0,
      bankOffers: "",
      images: [],
    },
    validationSchema: restaurantValidationSchema,
    onSubmit: (values) => console.log("values", values),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const values = formik.values;
    if (images?.length === 0) return;
    const offers = values?.offers?.includes(",")
      ? values.offers?.split(",").map((item) => item.trim())
      : restaurantDetails?.id > 0
      ? values.offers
      : [values.offers];

    const special = values?.special?.includes(",")
      ? values.special?.split(",").map((item) => item.trim())
      : restaurantDetails?.id > 0
      ? values.special
      : [values.special];
    const res = await makeAPICall(
      restaurantDetails?.id > 0
        ? `restaurants/${restaurantDetails.id}`
        : `restaurants`,
      {
        method: restaurantDetails?.id > 0 ? "PUT" : "POST",
        data: {
          ...values,
          offers,
          special,
          images,
          food: restaurantDetails?.food,
          created_by: user?.id,
        },
      }
    );
    if ([200, 201].includes(res?.status)) {
      toast.success(res?.message);
    } else {
      toast.error(error);
      setTimeout(() => {
        fetchRestaurants();
      }, 0);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = Array.from(e.target.files || []);
    const totalFiles = images?.length + files?.length;

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
        setImages((prev) => (prev ? [...prev, base64String] : [base64String]));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev?.filter((_, i) => i !== index));
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
  }, []);

  useEffect(() => {
    socketService.on("restaurant_status", (payload: any) => {
      setRestaurantDetails(payload);
    });

    return () => {
      socketService.off("restaurant_status");
    };
  });

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirm={handleConfirmDelete}
      />
      <Grid container spacing={2}>
        <Grid
          size={{ md: 4, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "red", fontWeight: 600 }}>
              Closed
            </Typography>
            <Switch
              color="success"
              name="open"
              checked={formik.values.open === 1}
              onChange={(e) =>
                formik.setFieldValue("open", e.target.checked ? 1 : 0)
              }
            />
            <Typography sx={{ color: "green", fontWeight: 600 }}>
              Open
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={{ md: 4, sm: 6, xs: 12 }}
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
          size={{ md: 4, sm: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Switch
              color="warning"
              name="isSpecial"
              checked={formik.values.isSpecial === 1}
              onChange={(e) =>
                formik.setFieldValue("isSpecial", e.target.checked ? 1 : 0)
              }
            />
            <Typography sx={{ fontWeight: 600 }}>Special</Typography>
          </Stack>
        </Grid>

        <Grid size={{ md: 12, sm: 12 }}>
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
                  loading="lazy"
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
            {(!images || images?.length < 4) && (
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

        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
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
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
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
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <InputLabel htmlFor="mode" sx={{ fontSize: 14, mb: 0.5 }}>
            Mode
          </InputLabel>
          <Select
            value={formik.values.mode}
            onChange={(event) =>
              formik.setFieldValue("mode", event.target.value)
            }
            error={(formik.touched.mode && formik.errors.mode) as any}
            displayEmpty
            sx={{
              height: "40px",
              width: "100%",
              fontSize: "0.8rem !important",
            }}
          >
            {[
              { id: "dine", label: "Dine In" },
              { id: "online", label: "Online" },
            ]?.map((option: { id: string; label: string }) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    fontWeight: formik.values.mode === option.id ? 600 : 500,
                  }}
                  value={option.id}
                >
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          {formik.touched.mode && formik.errors.mode && (
            <Typography sx={{ color: "red", fontSize: 13 }}>
              * {formik.errors.mode}
            </Typography>
          )}
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
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

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CustomButton
            btnText="Delete Restaurant"
            variant={BUTTON_VARIANT.OUTLINED}
            style={{ width: "max-content" }}
            onClick={() => setDeleteOpen(restaurantDetails?.id)}
          />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <CustomButton
              btnText="Save"
              variant={BUTTON_VARIANT.CONTAINED}
              style={{ width: "max-content" }}
              onClick={handleSubmit}
            />
            <CustomButton
              btnText="Cancel"
              variant={BUTTON_VARIANT.OUTLINED}
              style={{ width: "max-content" }}
              onClick={() => {
                formik.resetForm();
                setImages([]);
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default OwnerPage;
