import styles from '@/styles/Page.module.scss'
import { Banner, About, Blog } from '@/typings'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

const fetchHomeContent = async () => {
	try {
		const headers = {
			'content-type': 'application/json',
			Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`
		};
		const requestBody = {
			query: `
        query {
          bannerCollection {
            items {
              heroHeading
              heroSnippet
              heroImage {
                title
                description
                url
              }
              __typename
            }
          }
          aboutCollection {
            items {
              __typename
              aboutHeader
              aboutSnippet
              aboutImage {
                title
                description
                url
              }
            }
          }
          blogCollection(limit:3) {
            items {
              __typename
              blogSlug
              blogTitle
              blogImage {
                title
                description
                url
              }
              blogContent {
                json
              }
            }
          }
        }
      `
		};
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody)
		};
		const response = await (
			await fetch(
				`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
				options
			)
		).json();
		const banner: Banner[] = response?.data?.bannerCollection?.items;
    const about: About[] = response?.data?.aboutCollection?.items;
    const blogs: Blog[] = response?.data?.blogCollection?.items;
		return {
      banner,
      about,
      blogs
    };
	} catch (err) {
		console.log('ERROR DURING FETCH REQUEST', err);
	}
};

export default async function Home() {
  const homeContent = await fetchHomeContent();

  return (
    <main className={styles.main}>
      {homeContent && (
        <>
          <Hero bannerProps={homeContent?.banner[0]} />
          <section className={styles.oneColSection}>
            <Card
              header={homeContent?.about[0].aboutHeader} 
              content={homeContent?.about[0].aboutSnippet}
              image={homeContent?.about[0].aboutImage} 
              link='about'
              linkText='Learn'
            />
          </section>
          <section className={styles.threeColSection}>
            {homeContent?.blogs.map((blog, index) => {
              return (
                <Card
                  key={index}
                  header={blog.blogTitle} 
                  content=''
                  image={blog.blogImage}
                  link={`blog/${blog.blogSlug}`}
                  linkText='Read'
                />
              )
            })}
          </section>
          <Link href='/blog' className={styles.link}>Read all articles</Link>
        </>
      )}
    </main>
  )
}
