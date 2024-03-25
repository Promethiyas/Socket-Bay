import * as React from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { CountdownDeal } from '../components/DealAndOffer/CountdownDeal';

import { products } from '../../../mockup.json';
import { Button } from '@mui/material';

type Product = typeof products[0];

function getBid (bidSlug: string | undefined): Product | undefined {
  return products.find((product: Product) => product.id.toString() === bidSlug);
}

export default function BidPage (): JSX.Element {
  const { bidSlug } = useParams<{ bidSlug: string }>();
  const bid = React.useRef<Product | undefined>(getBid(bidSlug));

  if (!bid.current) {
    return (
      <Container fixed sx={{ padding: '1rem' }}>
        <Stack
          direction={'row'}
        >
          <Typography variant="h2">Bid not found</Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container fixed sx={{ padding: '1rem' }}>
      <Grid container>
        <Grid item xs={8}>
          <Stack
            direction={'column'}
            spacing={2}
          >
            <Typography variant="h2">{bid.current.title}</Typography>
            <img src={bid.current.images[0]} alt="Bid's picture" style={{ width: '600px' }} />
            <Typography variant="h4">Description</Typography>
            <Typography variant="body1">{bid.current.description}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            direction={'column'}
            spacing={2}
          >
            <Typography variant="h4">Current bid</Typography>
            <Typography variant="h6">{bid.current.price} €</Typography>
            <Typography variant="h4">Finish at</Typography>
            <CountdownDeal date={new Date(Date.now() + 100000000)} />
            <Button variant="contained">Place a bid</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
