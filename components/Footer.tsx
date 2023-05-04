import { navItems } from '@/utils'
import Link from 'next/link'
import styles from '@/styles/Footer.module.scss'

function Footer() {
  return (
    <section className={styles.footer}>
        <div className={styles.mainContainer}>
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
        </div>
        <div className={styles.disclaimer}>
            <p style={{ marginBottom: '1em' }}>Copyright &copy; {new Date().getFullYear()}</p>
            <a 
                href='https://sandeep-chandran-web-dev-portfolio.netlify.app/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
            >
                Website design by Sandeep Chandran
            </a>
        </div>
    </section>
  )
}

export default Footer