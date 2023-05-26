'use client';

import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";
import TrainerRating from "./TrainerRating";
import Rating from '@mui/material/Rating';

interface Props {
  reviewsList: Array<Review>;
};

interface Review {
  name: string;
  imagePath: string;
  rating: number;
  dateAdded: string;
  feedback: string;
}

export default function Reviews({
  reviewsList
}: Props) {
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ 
          borderRadius: '8px', 
          p: 3,
          mt: 3,
          width: '100%',
          backgroundColor: '#FFF'
        }}
      >
        <Typography variant="h4">Reviews</Typography>
        <Box sx={{ mb: 5 }}>
          <TrainerRating />
        </Box>

        {reviewsList.map((review: Review) => (
          <>
            <Box sx={{ display: 'flex' }}>
              <Avatar
                alt="Trainer Profile"
                sx={{
                  width: 35,
                  height: 35
                }}
                src={review.imagePath}
              />
              <Box sx={{ ml: 1 }}>
                <Typography variant="body2">
                  {review.name}
                </Typography>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  sx={{
                    color: '#21C79F',
                    fontSize: '1.1rem'
                  }}
                />
                <Box>
                  <Typography variant="body3">
                    {review.dateAdded}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, width: '80%' }}>
                    {review.feedback}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {reviewsList?.length > 1 && <Divider sx={{ my: 3 }} />}
          </>
        ))}
      </Box>
    </ThemeProvider>
  );
}