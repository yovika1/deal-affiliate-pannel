import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FreeGuidanceForm } from "../components/TipsList";

export const GuideDialog = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Update Guide" : "Add New Guide"}</DialogTitle>
      <DialogContent>
        <FreeGuidanceForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
