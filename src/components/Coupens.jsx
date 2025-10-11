import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { OfferForm } from "../dialogs/EditCouponDialog";
import API_BASE from "../config";

export const OffersTable = () => {
  const [offers, setOffers] = useState([]);
  const [selected, setSelected] = useState(null); // for edit

  const fetchOffers = async () => {
    const res = await axios.get(`${API_BASE}/getoffers`);
    setOffers(res.data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/deleteoffer/${id}`);
    fetchOffers();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Offers
      </Typography>

      <Button
        variant="contained"
        onClick={() => setSelected({})} 
        sx={{ mb: 2 }}
      >
        Add Offer
      </Button>

      {selected && (
        <OfferForm
          offer={selected}
          onClose={() => {
            setSelected(null);
            fetchOffers();
          }}
        />
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Featured</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableCell>{offer.productTitle}</TableCell>
              <TableCell>{offer.discount}</TableCell>
              <TableCell>{offer.category}</TableCell>
              <TableCell>
                {offer.expiry ? new Date(offer.expiry).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell>{offer.featured ? "✅" : "❌"}</TableCell>
              <TableCell>
                <IconButton onClick={() => setSelected(offer)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(offer._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
