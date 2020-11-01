import React, { ReactNode } from "react";
import "./base.css";
import { Container } from "./Container";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  );
};
