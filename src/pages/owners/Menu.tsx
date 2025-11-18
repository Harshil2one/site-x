import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CommonTable from "../../components/UI/Table";
import useFetch from "../../hooks/useFetch";
import { TABLE_NAME } from "../../enums";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { IRestaurant } from "../../types/restaurant.ts";
import toast from "react-hot-toast";
import CustomButton from "../../components/UI/Button";
import { ArrowDownFromLine, ArrowUpFromLine, Upload } from "lucide-react";
import FullScreenDialog from "../../components/UI/FullScreenModal";
import axiosInstance from "../../utils/axiosInstance";

const RestaurantMenu = () => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const { error, makeAPICall } = useFetch();

  const [restaurantDetails, setRestaurantDetails] = useState({} as IRestaurant);
  const [allFoods, setAllFoods] = useState([]);
  const [open, setOpen] = useState(-1);

  const fetchRestaurants = async () => {
    const res = await makeAPICall(`restaurants?created_by=${user.id}`, {
      method: "GET",
    });
    const restaurantDetails = res?.data?.[0];
    setRestaurantDetails(restaurantDetails);
  };

  const fetchFoods = async () => {
    const res = await makeAPICall(`foods`, {
      method: "GET",
    });
    setAllFoods(res?.data);
  };

  const downloadSampleCsvFile = async () => {
    try {
      const res = await axiosInstance.get("/csv/sample-download");

      const blob = new Blob([res.data?.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample_food_items.csv");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const importCsvFile = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axiosInstance.post("/csv/import", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data?.success) {
          toast.success(res.data?.message || "CSV imported successfully!");
          setOpen(-1);
          fetchFoods();
        } else {
          toast.error(res.data?.message || "Failed to import CSV");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error uploading CSV");
      }
    };
    input.click();
  };

  useEffect(() => {
    fetchRestaurants();
    fetchFoods();
  }, []);

  return (
    <Box sx={{ py: { md: 3, xs: 1, sm: 2 } }}>
      <FullScreenDialog
        open={open}
        setOpen={setOpen}
        title="Add Food Items Via CSV Upload"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          {[
            {
              icon: <ArrowDownFromLine size={30} />,
              label: "Download Sample CSV File",
              color: "black",
              handleClick: downloadSampleCsvFile,
            },
            {
              icon: <ArrowUpFromLine size={30} />,
              label: "Upload",
              color: "grey",
              handleClick: importCsvFile,
            },
          ].map((option) => (
            <Box
              key={option.label}
              sx={{
                border:
                  option.color === "black"
                    ? "1px solid #d3d3d3"
                    : "1px dashed #d3d3d3",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#f7f1f1",
                },
              }}
              onClick={option.handleClick}
            >
              {option.icon}
              <Typography sx={{ fontWeight: 500 }}>{option.label}</Typography>
            </Box>
          ))}
        </Box>
      </FullScreenDialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>Menu</Typography>
        <CustomButton
          btnText="Upload CSV"
          icon={<Upload size={18} />}
          style={{
            width: "max-content",
          }}
          onClick={() => setOpen(1)}
        />
      </Box>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        All Foods are listed with required details
      </Typography>

      <CommonTable
        tableName={TABLE_NAME.MENU}
        headers={[
          { id: "name", label: "Name", align: "left" },
          { id: "description", label: "Description", align: "left" },
          { id: "price", label: "Price", align: "left" },
          { id: "type", label: "Food Type", align: "center" },
          { id: "ratings", label: "Ratings", align: "center" },
          { id: "food-actions", label: "Actions", align: "center" },
        ]}
        listData={allFoods}
        restaurant={restaurantDetails}
        isPagination={false}
        rowsToShow={allFoods?.length}
        handleEdit={async (id: number) => {
          const res = await makeAPICall(
            restaurantDetails.id > 0
              ? `restaurants/${restaurantDetails.id}`
              : `restaurants`,
            {
              method: restaurantDetails.id > 0 ? "PUT" : "POST",
              data: {
                ...restaurantDetails,
                food: restaurantDetails?.food
                  ? [...restaurantDetails?.food, id]
                  : [id],
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
        }}
        handleDelete={async (id: number) => {
          const res = await makeAPICall(
            restaurantDetails.id > 0
              ? `restaurants/${restaurantDetails.id}`
              : `restaurants`,
            {
              method: restaurantDetails.id > 0 ? "PUT" : "POST",
              data: {
                ...restaurantDetails,
                food: restaurantDetails?.food?.filter(
                  (foodId: number) => foodId !== id
                ),
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
        }}
      />
    </Box>
  );
};

export default RestaurantMenu;
