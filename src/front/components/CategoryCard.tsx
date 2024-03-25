import React from 'react'
import type {
  Product
} from '../../types/types'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { products } from '../../../mockup.json'
import { cssBuilder, borderRadius } from '../helpers/css'
import { useNavigate } from 'react-router-dom'

interface CategoryCardProps {
  name: string
  representativeImageUrl: string
  searchParams: string
  // 8 products
  products: typeof products
}

function truncate (text: string, length: number = 15): string {
  return text.length > length ? text.slice(0, length) + '...' : text
}

export default function CategoryCard ({
  representativeImageUrl,
  name,
  searchParams,
  products
}: CategoryCardProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={
        cssBuilder()
          .addBoxShadow()
          .addBorderRadius('all')
          .extra({
            marginTop: '1rem'
          })
          .done()
      }
    >
      <Grid
        container
      >
        <Grid
          item
          xs={3}
          sx={
            cssBuilder()
              .addBorderRadius('left', 2)
              .extra({
                backgroundImage: `url(${representativeImageUrl})`,
                backgroundPosition: 'center',
                padding: 2
              })
              .done()
          }
        >
          <Typography variant='h6'>{name}</Typography>
          <Button
            variant="contained"
          ><Link to={`/search${searchParams}`}>Search</Link></Button>
        </Grid>

        <Grid item xs={12} sm container>
          {products.map((product, i) => {
            if (i % 2) return <></>;
            const nextProduct = products[i + 1];
            const styleGrid = cssBuilder()
              .addBorder(['top', 'right'], '2px', '#E0E0E0')
              .addBorderRadius('all')
              .extra({ padding: '1rem' })
              .done()

            return (
              <Grid item xs container direction="column" spacing={0}>
                <Grid
                  item
                  xs
                  sx={styleGrid}
                >
                  <Stack direction="column" spacing={2} alignItems={'center'}>
                    <Typography variant='body2' textAlign={'center'}>{truncate(product.title)}</Typography>

                    <Box width={120} height={120} display={'flex'} justifyContent={'center'} alignItems={'center'}
                      onClick={() => navigate(`/bid/${product.id}`)} sx={{ cursor: 'pointer' }}>
                      <img src={product.images[0]} alt={`Picture of ${product.brand}`} width={100} height={100} style={{ width: '100px', height: '100px', borderRadius: '4%' }} />
                    </Box>
                    <Typography variant='body2'>{product.price}$</Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs
                  sx={styleGrid}
                >
                  <Stack direction="column" spacing={2} alignItems={'center'}>
                    <Typography variant='body2' textAlign={'center'}>{truncate(nextProduct.title)}</Typography>
                    <Typography variant='body2'>{nextProduct.price}$</Typography>
                    <img src={nextProduct.images[0]} alt={`Picture of ${nextProduct.brand}`} width={100} height={100} style={{ width: '100px', height: '100px', borderRadius: '4%', cursor: 'pointer' }} onClick={() => navigate(`/bid/${product.id}`)} />
                  </Stack>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Box>
  )
}
