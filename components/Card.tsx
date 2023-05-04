'use client'

import styles from '@/styles/Card.module.scss'
import { Image as ImageType } from "@/typings"
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    header: string
    image: ImageType
    content: any
    link: string,
    linkText: string,
    date: string
}

function Card({ header, content, image, link, linkText, date }: Props) {
    return (
        <div className={styles.card}>
            {image?.url && 
                <div className={styles.col}>
                    <Image
                        // loader={myLoader}
                        src={image?.url}
                        alt={image?.description}
                        fill
                        className={styles.image}
                    />
                </div>
            }
            <div className={styles.col}>
                {header && <h3 className={styles.heading}>{header}</h3>}
                {date && <p className={styles.date}><i>{date}</i></p>}
                {content && <p className={styles.content}>{content}</p>}
                {link && (
                    <Link href={link} className={styles.link}>
                        {linkText} More
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Card