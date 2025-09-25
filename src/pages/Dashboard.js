import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import DiscountIcon from "@mui/icons-material/Discount";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Link } from "react-router-dom";
import { OffersTable } from "../components/Coupens";
import API_BASE from "../config";

export const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalClicks = 1200;
  const totalRevenue = "₹8,950";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, couponRes, feedbackRes] = await Promise.all([
          axios.get(`${API_BASE}/getBlogs`),
          axios.get(`${API_BASE}/getoffers`),
          axios.get(`${API_BASE}/getfeedback`), 
        ]);

        setBlogs(blogRes?.data || []);
        setCoupons(couponRes?.data || []);
        setFeedbacks(feedbackRes?.data || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ height: "98vh" }}>
      <Typography variant="h4" mt={2} gutterBottom>
        Admin Dashboard
      </Typography>

      <OffersTable />

      {/* Stats Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Blogs" />
            <CardContent>
              <Typography variant="h5">{blogs.length}</Typography>
              <ArticleIcon color="primary" fontSize="large" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Coupons" />
            <CardContent>
              <Typography variant="h5">{coupons.length}</Typography>
              <DiscountIcon color="secondary" fontSize="large" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Clicks" />
            <CardContent>
              <Typography variant="h5">{totalClicks}</Typography>
              <VisibilityIcon color="success" fontSize="large" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Revenue" />
            <CardContent>
              <Typography variant="h5">{totalRevenue}</Typography>
              <ShowChartIcon color="error" fontSize="large" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Blogs */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Recent Blogs"
              action={
                <Button component={Link} to="/manage-blogs">
                  Manage
                </Button>
              }
            />
            <CardContent>
              <List>
                {blogs.slice(0, 5).map((blog) => (
                  <React.Fragment key={blog._id}>
                    <ListItem>
                      <ListItemText
                        primary={blog.title || "Untitled"}
                        secondary={
                          blog.content
                            ? blog.content.slice(0, 50) + "..."
                            : "No content available"
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Coupons */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Recent Coupons"
              action={<Button href="/admin/coupons">Manage</Button>}
            />
            <CardContent>
              <List>
                {coupons.slice(0, 5).map((coupon) => (
                  <React.Fragment key={coupon._id}>
                    <ListItem>
                      <ListItemText
                        primary={coupon.code || "No code"}
                        secondary={coupon.description || "No description"}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ Recent Feedback */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Recent Feedback"
              action={
                <Button component={Link} to="/manage-feedback">
                  Manage
                </Button>
              }
            />
            <CardContent>
              <List>
                {feedbacks.slice(0, 5).map((fb) => (
                  <React.Fragment key={fb._id}>
                    <ListItem>
                      <ListItemText
                        primary={`${fb.category || "General"} - ${
                          fb.feedbackType === "yes" ? "👍 Yes" : "👎 No"
                        }`}
                        secondary={
                          fb.feedbackType === "no"
                            ? fb.feedbackText || "No details"
                            : "Positive feedback"
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
