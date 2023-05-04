'use client'
import React from 'react'
import { Banner } from '@/typings'
import styles from '@/styles/Hero.module.scss'

function Hero({ bannerProps }: { bannerProps: Banner }) {
    const { heroHeading, heroImage, heroSnippet } = bannerProps

    return (
        <section
            style={{
                backgroundImage: `url(${heroImage?.url})` ,
                width: '100%',
                height:'70vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPositionY: '30%',
                backgroundPositionX: '50%',
                position: 'relative'
            }}
        >
            <div className={styles.heroWrapper}>
                <h1 className={styles.heading}>
                    {heroHeading}
                </h1>
                <p className={styles.heroSnippet}>
                    {heroSnippet}
                </p>
            </div>
        </section>
    )
}

export default Hero