import Link from "next/link"
import React from "react"

const Nav = () => (
  <nav className="navbar sgb-navbar-marianne navbar-expand-lg navbar-light bg-light">
    <div className="sgb-marianne" />
    <div className="navbar-brand">
      <Link href="/">
        <a>ONVS</a>
      </Link>
      <div className="navbar-baseline" href="#">
        Observatoire National des Violences en Santé
      </div>
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div id="navbarSupportedContent" className="navbar-collapse collapse">
      <ul className="navbar-nav mr-auto" />
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href="/page2">
            <a
              className="nav-link"
              href="https://github.com/SocialGouv/sample-next-app"
            >
              Page 2
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <a
            target="_blank"
            className="nav-link"
            rel="noopener noreferrer"
            href="https://github.com/SocialGouv/sample-next-app"
          >
            GitHub
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default Nav
