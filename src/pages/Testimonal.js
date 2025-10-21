import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import axios from "axios";
import API_BASE from "../config";
import { CheckCircle, Delete } from "@mui/icons-material";

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/all`);
      setTestimonials(res.data.testimonials || []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_BASE}/approve/${id}`);
      fetchTestimonials(); 
    } catch (err) {
      console.error("Error approving testimonial:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`${API_BASE}/deleteComment/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        💬 Manage Testimonials
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : testimonials.length === 0 ? (
        <Typography color="text.secondary">No comments yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {testimonials.map((t) => (
            <Grid item xs={12} md={6} lg={4} key={t._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    “{t.text}”
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    👤 {t.userName || "Anonymous"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    🕒 {new Date(t.createdAt).toLocaleString()}
                  </Typography>

                  {t.blogId && (
                    <Typography variant="caption" color="primary">
                      Linked Blog: {t.blogId}
                    </Typography>
                  )}

                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    {t.approved ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Approved"
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleApprove(t._id)}
                      >
                        Approve
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
