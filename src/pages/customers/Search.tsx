import { useEffect, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import Input from "../../components/UI/Input";
import { ChevronLeft, Search, X } from "lucide-react";
import SearchCard from "../../components/search/SearchCard";
import useFetch from "../../hooks/useFetch";
import type { IRestaurant } from "../../types/restaurant";
import { useTranslation } from "react-i18next";

const filters = [
  { label: "Restaurants", id: "restaurants" },
  {
    label: "Dishes",
    id: "dishes",
  },
];

const SearchPage = () => {
  const { t } = useTranslation();

  const { response, makeAPICall } = useFetch();

  const [selectedFilter, setSelectedFilter] = useState("restaurants");
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);

  const clearData = () => {
    setFilteredData([]);
    setSearch("");
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    makeAPICall(`restaurants?requests=approved&type=${selectedFilter}&search=${value}`, {
      method: "GET",
    });
  };

  const handleFilterChange = () => {
    const newFilter =
      selectedFilter === "restaurants" ? "dishes" : "restaurants";
    setSelectedFilter(newFilter);
    makeAPICall(`restaurants?requests=approved&type=${newFilter}&search=${search}`, {
      method: "GET",
    });
  };

  useEffect(() => {
    if (response?.data) {
      setFilteredData(response.data);
    }
  }, [response]);

  return (
    <Box sx={{ py: {md: 3, xs: 1, sm: 2}, px: { md: 4, sm: 2, xs: 1 } }}>
      <Input
        placeholder={t("searchPlaceholder")}
        style={{
          width: "100%",
        }}
        startAdornment={<ChevronLeft />}
        endAdornment={<Search />}
        clearIcon={<X />}
        isFocused
        bounceTime={2000}
        onStartClick={clearData}
        onDebounce={handleSearch}
        onEndClick={clearData}
      />
      {search?.length > 0 &&
        filters.map((filter) => {
          return (
            <Chip
              key={filter.id}
              label={filter.label}
              variant={filter.id === selectedFilter ? "filled" : "outlined"}
              sx={{
                fontWeight: 700,
                mr: 1,
                mt: 2,
                py: 2,
                cursor: "pointer",
                color: filter.id === selectedFilter ? "white" : "#3D4050",
                backgroundColor:
                  filter.id === selectedFilter ? "#3D4050" : "white",
              }}
              onClick={handleFilterChange}
            />
          );
        })}
      {filteredData?.length ? (
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {filteredData?.map((el: IRestaurant) => {
            return (
              <Grid key={el.id} size={{ xs: 12, md: 6 }}>
                <SearchCard type={selectedFilter} place={el} />
              </Grid>
            );
          })}
        </Grid>
      ) : search?.length > 0 ? (
        <Box sx={{ minHeight: "40vh" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "20px", pt: 5 }}>
            No Restaurants Or Dishes Found.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ minHeight: "50vh" }} />
      )}
    </Box>
  );
};

export default SearchPage;
