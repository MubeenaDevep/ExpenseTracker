// import React from 'react';
// import { Box, Typography, Link, Grid, Divider } from '@mui/material';

// function Footer() {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: '#1f2937', 
//         color: '#f3f4f6',            
//         mt: 8,
//         px: { xs: 3, md: 8 },
//         py: 5,
//       }}
//     >
//       <Grid container spacing={4} justifyContent="space-between">
//         {/* Contact Section */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Contact Us
//           </Typography>
//           <Typography variant="body2">et@example.com</Typography>
//           <Typography variant="body2">+91-12345-67890</Typography>
//         </Grid>

//         {/* Policies Section */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Our Policies
//           </Typography>
//           <Link href="#" underline="hover" color="#d1d5db" display="block">
//             Privacy Policy
//           </Link>
//           <Link href="#" underline="hover" color="#d1d5db" display="block">
//             Terms & Conditions
//           </Link>
//         </Grid>

//         {/* Social Section */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Stay Connected
//           </Typography>
//           <Typography variant="body2">Follow us for updates</Typography>
//           <Typography variant="body2" mt={1}>@expensetracker</Typography>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 4, backgroundColor: '#374151' }} />

//       <Typography variant="body2" color="#9ca3af" align="center">
//         © {new Date().getFullYear()} Mubeena's Expense Tracker. All rights reserved.
//       </Typography>
//     </Box>
//   );
// }

// export default Footer;

import React from 'react';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#c9b79c',
        color: '#3e2723',
        mt: 8,
        px: { xs: 2, sm: 3, md: 8 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent={{ xs: 'center', md: 'space-between' }}
        alignItems="flex-start"
        textAlign={{ xs: 'center', md: 'left' }}
      >
        {/* Contact Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">et@example.com</Typography>
          <Typography variant="body2">+91-12345-67890</Typography>
        </Grid>

        {/* Policies Section */}
        <Grid item xs={12} md={4} sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Our Policies
          </Typography>
          <Link href="#" underline="hover" color="#3e2723" display="block">
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" color="#3e2723" display="block">
            Terms & Conditions
          </Link>
        </Grid>

        {/* Social Section */}
        <Grid item xs={12} md={4} sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Stay Connected
          </Typography>
          <Typography variant="body2">Follow us for updates</Typography>
          <Typography variant="body2" mt={1}>@expensetracker</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: '#374151' }} />

      <Typography variant="body2" color="#00050cff" align="center">
        © {new Date().getFullYear()} Mubeena's Expense Tracker. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;