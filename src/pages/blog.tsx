import { ArticlePreview } from '@components/ArticlePreview'
import { Layout } from '@components/Layout'
import { BlogQuery } from '@graphqlTypes'
import { PageProps, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Helmet } from 'react-helmet'

import styles from './blog.module.scss'

const BlogIndex = ({ data }: PageProps<BlogQuery>) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allContentfulBlogPost.edges')

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>Blog</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }: any) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query Blog {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
