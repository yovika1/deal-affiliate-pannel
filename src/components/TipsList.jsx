import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

export const FreeGuidanceForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    heading: "",
    description: "",
    image: "",
    productLink: "",
    buttonText: "", 
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ heading: "", description: "", image: "", productLink: "", buttonText: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 2, mb: 3 }}
    >
      <TextField
        name="heading"
        label="Heading"
        value={form.heading}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        name="image"
        label="Image URL"
        value={form.image}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="productLink"
        label="Product Link"
        value={form.productLink}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="buttonText"
        label="Button Text"
        value={form.buttonText}
        onChange={handleChange}
        fullWidth
        placeholder="Shop Now"
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        {onCancel && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};
