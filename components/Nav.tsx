'use client'
import styles from '@/styles/Nav.module.scss'
import Link from 'next/link'
import { navItems } from '@/utils'

function Nav() {
  return (
    <div className={styles.nav}>
      <Link href={navItems[0].link} className={styles.logo}>Willow Bark Management</Link>
      <ul className={styles.navItems}>
        {navItems.map((item, index) => {
          return (
            <li key={index} className={styles.navItem}>
              <Link href={item.link} className={styles.link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav