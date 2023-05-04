export type Banner = {
    heroHeading: string
    heroSnippet: string
    heroImage: Image
    __typename: string
}

export type Image = {
    title: string
    description: string
    url: string
}

export type About = {
    __typename: string
    aboutHeader: string
    aboutSnippet: string
    aboutDescription: string
    aboutImage: Image
}

export type Blog = {
    __typename: string
    blogSlug: string
    blogTitle: string
    blogImage: Image
    blogContent: any
    sys: any
}