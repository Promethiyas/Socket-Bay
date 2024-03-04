import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopNavBar } from '../components/NavBar.tsx'

export function Shop (): JSX.Element {
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  )
}
