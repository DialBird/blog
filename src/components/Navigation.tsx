import { Link } from 'gatsby'
import React from 'react'

import styles from './Navigation.module.scss'

export const Navigation = () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Blog</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/products/">Products</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/features/">Features</Link>
      </li>
    </ul>
  </nav>
)
