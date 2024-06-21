import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Pagination,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import "./products.css";

const Products = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(6);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setPhotos(response.data);
    });
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (event, value) => setCurrentPage(value);

  const handlePhotosPerPageChange = (event) => {
    setPhotosPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const pageCount = Math.ceil(photos.length / photosPerPage);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        className="samar"
        sx={{ mt: "24px" }}
      >
        <h1>Photos</h1>
        <h1>PRODUCTS</h1>
      </Typography>
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1" sx={{ mr: 2 }}>
          <h3>Photos per page:</h3>
        </Typography>
        <TextField
          type="number"
          value={photosPerPage}
          onChange={handlePhotosPerPageChange}
          inputProps={{ min: 1 }}
          sx={{ width: 100 }}
          className="pages"
        />
      </Box>
      <Grid container spacing={4}>
        {currentPhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card
              className="foto"
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => openModal(photo)}
            >
              <CardMedia
                component="img"
                image={photo.image}
                alt={photo.title}
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  objectFit: "contain",
                  height: 300, 
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {photo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category: {photo.category}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: ${photo.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={paginate}
          color="primary"
          size="large"
        />
      </Box>
      <Modal
        open={Boolean(selectedPhoto)}
        onClose={closeModal}
        aria-labelledby="photo-modal"
        aria-describedby="photo-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {selectedPhoto && (
            <div
              className="single"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                flexWrap: "wrap",
              }}
            >
              <div
                className="img"
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  image={selectedPhoto.image}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "80vh",
                  }}
                />
              </div>
              <div
                className="info"
                style={{
                  flex: 1,
                  padding: "20px",
                  textAlign: "center",
                  overflowY: "auto",
                }}
              >
                <Typography variant="h5" id="photo-modal" gutterBottom>
                  {selectedPhoto.title}
                </Typography>
                <Typography variant="body1" id="photo-details" gutterBottom>
                  {selectedPhoto.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category: {selectedPhoto.category}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  Price: ${selectedPhoto.price}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Rating: {selectedPhoto.rating.rate} (
                  {selectedPhoto.rating.count} reviews)
                </Typography>
                <Box mt={2} textAlign="center">
                  <Button variant="contained" onClick={closeModal}>
                    Close
                  </Button>
                </Box>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Products;
