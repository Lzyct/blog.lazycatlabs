import CustomLink from '@/components/Link' //import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { useEffect, useState } from 'react'
import Search from '@/components/Search'
import Card from '@/components/Card'

//import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 10

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('posts')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const [searchValue, setSearchValue] = useState('')
  const [filteredBlogPosts, setFilteredBlogPost] = useState(posts)

  useEffect(() => {
    const filtered = posts.filter((frontMatter) => {
      const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilteredBlogPost(filtered)
  }, [searchValue, posts])

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts = posts.length > 0 && !searchValue ? posts : filteredBlogPosts

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-2 pb-4 pt-4 md:space-y-6 md:pt-20">
        <h1 className="font-extrabold text-peach sm:text-3xl sm:leading-10 md:text-6xl">Latest</h1>
        <Search onChange={setSearchValue} />
      </div>
      {!filteredBlogPosts.length ? (
        <div className="content-center py-12 text-center">
          <span className="text-l font-medium text-red">" {searchValue} "</span>
          <span> is not found</span>
        </div>
      ) : null}
      <ul className="grid gap-4 md:grid-cols-2">
        {displayPosts.map((frontMatter) => (
          <Card key={frontMatter.slug} {...frontMatter} />
        ))}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end py-8 text-base font-medium leading-6">
          <CustomLink href="/posts" className="text-sky" aria-label="all posts">
            All Posts &rarr;
          </CustomLink>
        </div>
      )}
    </>
  )
}
