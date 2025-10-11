import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography, Tabs, Tab, Box, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import API_BASE from "../config";

export const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getfeedback`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch feedbacks");
    }
  };

  const handleOpenReply = (feedback) => {
    setCurrentFeedback(feedback);
    setReplyMessage(feedback.adminReply || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentFeedback(null);
    setReplyMessage("");
  };

  // Send reply & mark resolved
  const handleSendReply = async () => {
  if (!replyMessage.trim()) return alert("Reply cannot be empty");

  try {
    await axios.post(`${API_BASE}/reply/${currentFeedback._id}`, { replyMessage });
    alert("✅ Reply sent and feedback resolved!");
    handleCloseDialog();
    fetchFeedback();
  } catch (err) {
    console.error(err);
    alert("❌ Failed to send reply. Please try again.");
  }
};


  // Resolve without reply
  const handleResolve = async (feedbackId) => {
    try {
      await axios.put(`${API_BASE}/resolve/${feedbackId}`);
      alert("Feedback marked as resolved");
      fetchFeedback();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as resolved");
    }
  };

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter === "yes") return fb.feedbackType === "yes";
    if (filter === "no") return fb.feedbackType === "no";
    if (filter === "unresolved") return fb.feedbackType === "no" && !fb.resolved;
    return true;
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Tabs value={filter} onChange={(e, v) => setFilter(v)} centered>
        <Tab label="All" value="all" />
        <Tab label="👍 Positive" value="yes" />
        <Tab label="👎 Negative" value="no" />
        <Tab label="🚩 Unresolved Queries" value="unresolved" />
      </Tabs>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Feedback</b></TableCell>
              <TableCell><b>User Email</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map(fb => (
                <TableRow key={fb._id}>
                  <TableCell>{fb.category || "General"}</TableCell>
                  <TableCell>{fb.feedbackType === "yes" ? "👍 YES" : "👎 NO"}</TableCell>
                  <TableCell>{fb.feedbackType === "no" ? (fb.feedbackText || "—") : "—"}</TableCell>
                  <TableCell>{fb.userEmail || "Not provided"}</TableCell>
                  <TableCell>{new Date(fb.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {fb.resolved ? (
                      <Chip label="Resolved" color="success" size="small" />
                    ) : (
                      <Chip label="Pending" color="warning" size="small" />
                    )}
                  </TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    {!fb.resolved && fb.feedbackType === "no" && fb.userEmail && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenReply(fb)}
                      >
                        Reply & Resolve
                      </Button>
                    )}
                    {!fb.resolved && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleResolve(fb._id)}
                      >
                        Resolve Only
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No feedback found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Reply to {currentFeedback?.userEmail}</DialogTitle>
        <DialogContent>
          <TextField
            label="Reply Message"
            multiline
            rows={4}
            fullWidth
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSendReply}>Send Reply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
