import './base.css'

import React, { ReactNode } from 'react'

import { Container } from './Container'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  )
}
