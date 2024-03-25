import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

import { products } from '../../../../mockup.json'
import { CountdownDeal } from './CountdownDeal'
import { cssBuilder } from '../../helpers/css'

const END_OFFERT = new Date('2024-12-31T23:59:59')

function getProduct (): typeof products {
  return products.sort(() => Math.random() - 0.5).splice(0, 5)
}

export function DealAndOffer (): JSX.Element {
  const navigate = useNavigate();
  const products = getProduct();

  return (
    <Box
      component="section"
      sx={
        cssBuilder()
        .addBoxShadow()
        .addBorderRadius('all')
        .useTheme()
        .setBgColor()
        .extra({
          p: 2,
        })
        .done()
      }
    >
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-around"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">
              Deals and offers
            </Typography>
            <Typography variant="body1" gutterBottom>
              Buy now and get a discount
            </Typography>
          </div>
          <CountdownDeal date={END_OFFERT} />
        </Stack>
        {products.map((product) => (
          <Stack
            key={product.id}
            alignItems="center"
            gap={1}
          >
            <Paper elevation={3} sx={{ width: '6rem', cursor: 'pointer' }}
              onClick={() => navigate(`/bid/${product.id}`)}
            >
              <img
                src={product.images[0]}
                alt={`Picture of ${product.brand}`}
                width={100}
                height={100}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4%'
                }}
              />
            </Paper>
            <Typography variant="body2">{product.brand}</Typography>
            <Chip label='-25%' sx={{ paddingLeft: 0.5, paddingRight: 0.5 }} />
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}
