import styles from '@/styles/Page.module.scss'
import { Blog } from '@/typings'
import Card from '@/components/Card'

const fetchBlogs = async () => {
	try {
		const headers = {
			'content-type': 'application/json',
			Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`
		};
		const requestBody = {
			query: `
                query {
                    blogCollection(limit:20) {
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
        const blogs: Blog[] = response?.data?.blogCollection?.items;
        return blogs
	} catch (err) {
		console.log('ERROR DURING FETCH REQUEST', err);
	}
};

async function Blog() {
    const blogs = await fetchBlogs();

    return (
        <main className={styles.main}>
            <section className={styles.oneColSection}>
                {blogs?.map((blog, index) => {
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
        </main>
    )
}

export default Blog