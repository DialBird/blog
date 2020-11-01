import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => (
  <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
)
