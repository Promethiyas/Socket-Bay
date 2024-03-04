import Container from '@mui/material/Container'
import * as React from 'react'
import { AuthForm } from '../components/AuthForm'

export function HomePage (): JSX.Element {
  return (
    <Container fixed>
      <AuthForm />
    </Container>
  )
}
