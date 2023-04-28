import { navItems } from '@/utils'
import Link from 'next/link'
import styles from '@/styles/Footer.module.scss'

function Footer() {
  return (
    <section className={styles.footer}>
        <ul className={styles.colOne}>
            {navItems.map((item, index) => {
                return (
                    <li key={index}>
                        <Link href={item.link} className={styles.link}>{item.title}</Link>
                    </li>
                )
            })}
        </ul>
        <div className={styles.colTwo}>
            <h3 className={styles.header}>Contact Us</h3>
            <a href='mailto:email@example.com' className={styles.link}>email@email.com</a>
            <a href='tel:222-222-2222' className={styles.link}>222-222-2222</a>
        </div>
        <div className={styles.disclaimer}>
            <p>
                Website design by 
                <a href='https://sandeep-chandran-web-dev-portfolio.netlify.app/' className={styles.link}>
                    Sandeep Chandran
                </a>
            </p>
        </div>
    </section>
  )
}

export default Footer