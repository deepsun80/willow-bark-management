import styles from '@/styles/Page.module.scss'
import { Blog } from '@/typings'
import Card from '@/components/Card'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const fetchBlogContent = async (slug: string) => {
	try {
		const headers = {
			'content-type': 'application/json',
			Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`
		};
		const requestBody = {
			query: `
                query {
                    blogCollection(where: {blogSlug:"${slug}"}) {
                        items {
                            __typename
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
			body: JSON.stringify(requestBody),
            next: { revalidate: 60 },
		};
		const response = await (
			await fetch(
				`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
				options
			)
		).json();
        const blogContent: Blog[] = response?.data?.blogCollection?.items;
        return blogContent
	} catch (err) {
		console.log('ERROR DURING FETCH REQUEST', err);
	}
};

async function Blog({ params }:{ params: { slug: string }}) {
    const blogC = await fetchBlogContent(params.slug)

    return (
        <main className={styles.main} style={{ margin: '2em auto' }}>
            {blogC && (
                <section className={styles.oneColSection}>
                    <Card
                        header={blogC[0].blogTitle} 
                        content={documentToReactComponents(blogC[0].blogContent.json)}
                        image={blogC[0].blogImage} 
                        link=''
                        linkText=''
                    />
                </section>
            )}
        </main>
    )
}

export default Blog