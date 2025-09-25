import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import API_BASE from "../config";

export const OfferForm = ({ offer, onClose }) => {
  const [form, setForm] = useState(offer || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (form._id) {
        await axios.put(
          `${API_BASE}/updateoffer/${form._id}`,
          form
        );
      } else {
        await axios.post(`${API_BASE}/createoffer`, form);
      }
      onClose();
    } catch (err) {
      console.error("Error saving offer:", err);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{form._id ? "Edit Offer" : "Add Offer"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Title"
          name="productTitle"
          value={form.productTitle || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Discount"
          name="discount"
          value={form.discount || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="details"
          value={form.details || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={form.imageUrl || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Affiliate Link"
          name="affiliateUrl"   
          value={form.affiliateUrl || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Coupon Code"
          name="code"
          value={form.code || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Expiry Date"
          name="expiry"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.expiry ? form.expiry.substring(0, 10) : ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={form.rating || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Ratings Count"
          name="ratingsCount"
          type="number"
          value={form.ratingsCount || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Badges (comma-separated)"
          name="badges"
          value={Array.isArray(form.badges) ? form.badges.join(", ") : form.badges || ""}
          onChange={(e) =>
            setForm({
              ...form,
              badges: e.target.value.split(",").map((b) => b.trim()),
            })
          }
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.featured || false}
              onChange={handleChange}
              name="featured"
            />
          }
          label="Featured Offer"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {form._id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
