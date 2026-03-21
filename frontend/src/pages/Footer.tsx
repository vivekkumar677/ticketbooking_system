import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return (
    <Box component="footer"
        sx={{
            background: "#0b0f19",
            color: "#fff",
            mt: 6,
            pt: 6,
            pb: 3,
        }}
    >
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">Show Time</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt:2, color: "#94a3b8" }}>
                        Book tickets for movies, events, and live shows instantly. 
                        Enjoy a seamless Experience entertainment like never before.
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1" gutterBottom>
                        Explore
                    </Typography>
                    <Link to="/movies" color="inherit" style={{ display: "block" }}>Movies</Link>
                    <Link to="/events" color="inherit" style={{ display: "block" }}>Events</Link>
                    <Link to="/shows" color="inherit" style={{ display: "block" }}>Shows</Link>
                    <Link to="/theatres" color="inherit" style={{ display: "block" }}>Theatres</Link>
                    <Link to="/offers" color="inherit" style={{ display: "block" }}>Offers</Link>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1" gutterBottom>
                        Support
                    </Typography>
                    <Link to="/help" color="inherit" style={{ display: "block" }}>Help Center</Link>
                    <Link to="/contact" color="inherit" style={{ display: "block" }}>Contact Us</Link>
                    <Link to="/refund" color="inherit" style={{ display: "block" }}>Refund Policy</Link>
                    <Link to="/terms" color="inherit" style={{ display: "block" }}>Terms & Conditions</Link>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1" gutterBottom>
                        Account
                    </Typography>
                    <Link to="/login" color="inherit" style={{ display: "block" }}>Login</Link>
                    <Link to="/register" color="inherit" style={{ display: "block" }}>Register</Link>
                    <Link to="/profile" color="inherit" style={{ display: "block" }}>Profile</Link>
                    <Link to="/bookings" color="inherit" style={{ display: "block" }}>My Bookings</Link>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1" gutterBottom>
                        Follow Us
                    </Typography>
                    <IconButton color="inherit" href="https://www.facebook.com/ShowTime" target="_blank">
                        <Facebook />
                    </IconButton>
                    <IconButton color="inherit" href="https://www.twitter.com/ShowTime" target="_blank">
                        <Twitter />
                    </IconButton>
                    <IconButton color="inherit" href="https://www.instagram.com/ShowTime" target="_blank">
                        <Instagram />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{ my: 4, backgroundColor: "#1e293b" }} />
            <Box textAlign="center">
                <Typography variant="body2" sx={{ color: "#64748b"}}>
                    &copy; {new Date().getFullYear()} Show Time. All rights reserved.
                </Typography>
            </Box>
        </Container>
    </Box>
  );
};  

export default Footer;