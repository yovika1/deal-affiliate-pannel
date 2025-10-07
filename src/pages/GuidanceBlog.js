import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Snackbar, Alert, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GuideDialog } from "../dialogs/FreeguideDialog";
import API_BASE from "../config";

export const SkincareGuideEditor = () => {
  const [guidances, setGuidances] = useState([]);
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [openDialog, setOpenDialog] = useState(false);

  const BASE_URL = API_BASE;
  const GET_GUIDES = `${BASE_URL}/getGuide`;
  const CREATE_GUIDE = `${BASE_URL}/createGuide`;
  const UPDATE_GUIDE = (id) => `${BASE_URL}/updateGuide/${id}`;
  const DELETE_GUIDE = (id) => `${BASE_URL}/deleteguidance/${id}`;

  const loadGuidances = async () => {
    try {
      const res = await axios.get(GET_GUIDES);
      setGuidances(res.data);
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: "Failed to fetch guides", severity: "error" });
    }
  };

  useEffect(() => {
    loadGuidances();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        const { _id, ...rest } = data;
        await axios.put(UPDATE_GUIDE(editing._id), rest);
        setAlert({ open: true, message: "Guide updated successfully!", severity: "success" });
        setEditing(null);
      } else {
        await axios.post(
          CREATE_GUIDE, data);
        setAlert({ open: true, message: "Guide added successfully!", severity: "success" });
      }
      setOpenDialog(false);
      loadGuidances();
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: "Failed to save guide", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(DELETE_GUIDE(id));
        setAlert({ open: true, message: "Guide deleted successfully!", severity: "success" });
        loadGuidances();
      } catch (error) {
        console.error(error);
        setAlert({ open: true, message: "Failed to delete guide", severity: "error" });
      }
    }
  };

 const columns = [
  { field: "heading", headerName: "Heading", width: 180 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="img"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ) : (
        "N/A"
      ),
  },
  {
    field: "productLink",
    headerName: "Product Link",
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <Button variant="outlined" size="small" href={params.value} target="_blank">
          View
        </Button>
      ) : (
        "N/A"
      ),
  },
  {
    field: "buttonText",   // ✅ New column for button text
    headerName: "Button Text",
    width: 150,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setEditing(params.row);
            setOpenDialog(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Free Guidance Panel
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setEditing(null);
          setOpenDialog(true);
        }}
      >
        Add New Guide
      </Button>

      <GuideDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSave}
        initialData={editing}
      />

      <Box sx={{ height: 500, width: "100%", mt: 2 }}>
        <DataGrid
          rows={guidances.map((g) => ({ ...g, id: g._id }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
