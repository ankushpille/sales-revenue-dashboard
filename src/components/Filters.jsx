import { Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchSales } from "../redux/slices/salesSlice";

export default function Filters() {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const filters = {
      category: form.get("category") || "",
      region: form.get("region") || "",
    };

    dispatch(fetchSales(filters));
  };

  return (
    <Box component="form" onSubmit={handleFilter} mb={3} display="flex" gap={2}>
      <TextField name="category" label="Category" />
      <TextField name="region" label="Region" />
      <Button type="submit" variant="contained">Apply</Button>
    </Box>
  );
}
