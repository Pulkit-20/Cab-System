import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditCabs = () => {
  const [loading, setLoading] = useState(false);
  const [newCabPic, setNewCabPic] = useState("");
  const [cabs, setCabs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCab, setSelectedCab] = useState(null);
  const [newCabType, setNewCabType] = useState("");
  const [newCabPrice, setNewCabPrice] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const postDetails = (pics) => {
    setLoading(true);
    if (!pics) {
      setLoading(false);
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg" ||
      pics.type === "image/webp"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "echo-hub");
      data.append("cloud_name", "dsus6juuo");
      fetch("https://api.cloudinary.com/v1_1/dsus6juuo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setNewCabPic(data.url.toString());
          setLoading(false);
          handleSnackbarOpen("Image uploaded successfully!", "success");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          handleSnackbarOpen(
            "Failed to upload image. Please try again!",
            "error"
          );
        });
    } else {
      setLoading(false);
      handleSnackbarOpen("Please select a valid image!", "warning");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const fetchCabs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/cab");
        setCabs(response.data);
      } catch (error) {
        console.error("Error fetching cabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  const handleEditClick = (cab) => {
    setSelectedCab(cab);
    setNewCabType(cab.cabType || "");
    setNewCabPrice(cab.cabPrice || "");
    setNewCabPic(cab.cabPic || "");
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCab(null);
    setNewCabType("");
    setNewCabPrice("");
    setNewCabPic("");
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`/cab/edit/${selectedCab._id}`, {
        cabType: newCabType,
        cabPrice: newCabPrice,
        cabPic: newCabPic,
      });

      const updatedCabs = cabs.map((cab) =>
        cab._id === selectedCab._id ? response.data.cab : cab
      );
      setCabs(updatedCabs);

      handleSnackbarOpen("Cab updated successfully!", "success");
    } catch (error) {
      console.error("Error updating cab:", error);
      handleSnackbarOpen("Failed to update cab. Please try again!", "error");
    } finally {
      setLoading(false);
      handleDialogClose(); // Close the dialog regardless of success or failure
    }
  };

  const handleAddCab = async () => {
    setLoading(true);
    try {
      // Perform the add cab functionality
      const response = await axios.post("/cab/add", {
        cabType: newCabType,
        cabPrice: newCabPrice,
        cabPic: newCabPic,
      });

      // Add the new cab to the existing list
      setCabs([...cabs, response.data.cab]);

      handleSnackbarOpen("Cab added successfully!", "success");
    } catch (error) {
      console.error("Error adding cab:", error);
      handleSnackbarOpen("Failed to add cab. Please try again!", "error");
    } finally {
      setLoading(false);
      handleDialogClose(); // Close the dialog after adding cab
    }
  };

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <div>
          <Grid container spacing={2}>
            {cabs.map((cab) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cab._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={cab.cabPic}
                    alt={cab.cabType}
                  />
                  <CardContent>
                    <div>Cab Type: {cab.cabType}</div>
                    <div>Price/min: {cab.cabPrice}</div>
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEditClick(cab)}
                    >
                      <EditIcon />
                    </Fab>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setOpenDialog(true)}
              >
                <CardContent>
                  <AddIcon style={{ fontSize: 60 }} />
                  <div>Add Cab</div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Edit Cab</DialogTitle>
            <DialogContent>
              <TextField
                label="Cab Type"
                value={newCabType}
                onChange={(e) => setNewCabType(e.target.value)}
                fullWidth
                style={{ marginBottom: "20px", marginTop: "20px" }}
              />
              <TextField
                label="Cab Price"
                value={newCabPrice}
                onChange={(e) => setNewCabPrice(e.target.value)}
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                style={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={selectedCab ? handleSaveChanges : handleAddCab}
                style={{ marginTop: "10px" }}
              >
                {selectedCab ? "Save Changes" : "Add Cab"}
              </Button>
            </DialogContent>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={8000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <div>
              <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </div>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default EditCabs;
