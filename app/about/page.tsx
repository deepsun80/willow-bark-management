import styles from '@/styles/Page.module.scss'
import { About } from '@/typings'
import Card from '@/components/Card'

const fetchAboutContent = async () => {
	try {
		const headers = {
			'content-type': 'application/json',
			Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`
		};
		const requestBody = {
			query: `
                query {
                    aboutCollection {
                        items {
                          __typename
                          aboutHeader
                          aboutSnippet
                          aboutDescription
                          aboutImage {
                            title
                            description
                            url
                          }
                        }
                    }
                }
            `
		};
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody),
            next: { revalidate: 60 },
		};
		const response = await (
			await fetch(
				`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
				options
			)
		).json();
        const aboutContent: About[] = response?.data?.aboutCollection?.items;
        return aboutContent
	} catch (err) {
		console.log('ERROR DURING FETCH REQUEST', err);
	}
};

async function About() {
    const aboutContent = await fetchAboutContent()

    return (
        <main className={styles.main} style={{ margin: '2em auto' }}>
            {aboutContent && (
                <section className={styles.oneColSection}>
                    <Card
                        header={aboutContent[0].aboutHeader} 
                        content={aboutContent[0].aboutDescription}
                        image={aboutContent[0].aboutImage} 
                        link=''
                        linkText=''
                    />
                </section>
            )}
        </main>
    )
}

export default About