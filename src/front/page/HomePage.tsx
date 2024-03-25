import * as React from 'react'

import { DealAndOffer } from '../components/DealAndOffer/DealAndOffer'
import Categories from '../components/Categories'

import Container from '@mui/material/Container'

export function HomePage (): JSX.Element {
  return (
    <Container fixed sx={{ padding: '1rem' }}>
      <DealAndOffer />
      <Categories />
    </Container>
  )
}
