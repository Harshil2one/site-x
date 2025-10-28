import React, { useEffect, useState } from "react";
import { Box, Chip, FormControl, MenuItem, Select } from "@mui/material";
import { X } from "lucide-react";
import type { IFilter } from "../../types/common";

interface IProps {
  filters: IFilter[];
  defaultSelected?: string[];
  selectedFilter?: Record<string, boolean>;
  setSelectedFilter?: any;
}

const sortingOption = [
  "Sort By",
  "Relevance(Default)",
  "Delivery Time",
  "Rating",
  "Cost:Low to High",
  "Cost:High to Low",
];

const initialFilters = {
  veg: false,
  "non-veg": false,
  ratings: false,
  offers: false,
  rate300to600: false,
  rateLessThan300: false,
  new: false,
  distanceWithin5km: false,
};

const Filters = (props: IProps) => {
  const { filters, defaultSelected, selectedFilter, setSelectedFilter } = props;
  const [sort, setSort] = useState("Sort By");

  useEffect(() => {
    setSelectedFilter(initialFilters);
    if (!defaultSelected) return;

    setSelectedFilter((prev: any) => {
      return {
        ...prev,
        offers: defaultSelected ? true : false,
      };
    });
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <FormControl>
        <Select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value === "Relevance(Default)"
                ? "Sort By"
                : event.target.value
            )
          }
          displayEmpty
          sx={{
            height: "35px",
            borderRadius: "40px",
            fontSize: "0.8rem !important",
          }}
        >
          {sortingOption?.map((option, index) => {
            return (
              <MenuItem
                key={index + 1}
                sx={{
                  display: index === 0 ? "none" : "",
                  fontWeight: sort === option ? 600 : 500,
                }}
                value={option}
              >
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {filters?.map((filter) => {
        return (
          <Chip
            key={filter.id}
            label={filter.title}
            variant="outlined"
            deleteIcon={<X size={16} color="black" />}
            sx={{
              py: 2,
              px: 0.5,
              cursor: "pointer",
              borderWidth: { ...selectedFilter }[filter.label] ? "2px" : "",
              backgroundColor: { ...selectedFilter }[filter.label]
                ? "#f5f5f7"
                : "",
              fontWeight: { ...selectedFilter }[filter.label] ? 600 : 500,
              borderColor: { ...selectedFilter }[filter.label] ? "black" : "",
            }}
            onClick={() =>
              setSelectedFilter((prev: any) => {
                return {
                  ...prev,
                  [filter.label]: !{ ...prev }[filter.label],
                };
              })
            }
            onDelete={
              { ...selectedFilter }[filter.label]
                ? () =>
                    setSelectedFilter((prev: any) => {
                      return {
                        ...prev,
                        [filter.label]: !{ ...prev }[filter.label],
                      };
                    })
                : undefined
            }
          />
        );
      })}
    </Box>
  );
};

export default Filters;
