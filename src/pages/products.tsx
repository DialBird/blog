import { ArticlePreview } from '@components/ArticlePreview'
import { Hero } from '@components/Hero'
import { Layout } from '@components/Layout'
import { PageProps, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Helmet } from 'react-helmet'

import styles from './blog.module.scss'

const ProductsIndex = ({ data }: PageProps) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allContentfulBlogPost.edges')

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>Products</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent products</h2>
          <ul className="article-list">
            {products.map(({ node }: any) => {
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

export default ProductsIndex

export const pageQuery = graphql`
  query ProductsIndexQuery {
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