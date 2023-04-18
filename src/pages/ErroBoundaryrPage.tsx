import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

function ErrorPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container>
      <Box width={1} height={1} display="flex" justifyContent="center" alignItems="center" p={1}>
        <Typography
          variant={matches ? 'h1' : 'h3'}
          color="text.primary"
          sx={{
            '@keyframes fadeShine': {
              from: {
                opacity: 0,
                boxShadow: 'none',
              },
              to: {
                opacity: 1,
                boxShadow: `0 0 20px 2px ${theme.palette.secondary.main}`,
              },
            },

            animation: 'fadeShine 1s infinite linear alternate-reverse',
            p: 2,
            borderRadius: theme.spacing(4),
          }}
        >
          Oops ! 404 Not found ... 🧘
        </Typography>
      </Box>
    </Container>
  );
}

export default ErrorPage;
