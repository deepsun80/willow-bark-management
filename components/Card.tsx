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
    linkText: string
}

function Card({ header, content, image, link, linkText }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.col}>
                <Image
                    // loader={myLoader}
                    src={image?.url}
                    alt={image?.description}
                    fill
                />
            </div>
            <div className={styles.col}>
                <h3>{header}</h3>
                <p>{content}</p>
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