import * as React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { products, categories } from '../../../mockup.json'
import CategoryCard from './CategoryCard'

function getProductByCategory (categoryId: number): typeof products {
  return products
    .filter((product) => product.category === categoryId)
    .sort(() => Math.random() - 0.5)
    .splice(0, 8)
}

export default function Categories (): JSX.Element {
  return (
      <Stack
        spacing={2}
        direction="column"
        sx={{
          marginTop: '1rem',
          borderRadius: 2,
        }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            representativeImageUrl={category.representativeImageUrl}
            searchParams={`?cat=${category.id}`}
            products={getProductByCategory(category.id)}
          />
        ))}
      </Stack>
  )
}