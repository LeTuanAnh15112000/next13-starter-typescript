"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link className="navbar-brand" href="/">
            TuanAnh
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" href="/facebook">
                Facebook
              </Link>
              <Link className="nav-link" href="/tiktok">
                Tiktok
              </Link>
              <Link className="nav-link" href="/youtube">
                Youtube
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
