import Container from '@mui/material/Container'
import * as React from 'react'
import { AuthForm } from '../components/AuthForm'
import { TopNavBar } from '../components/NavBar.tsx'

export function HomePage() {
  return <>
    <TopNavBar />
    <Container fixed>
      <AuthForm />
    </Container>
  </>
}
