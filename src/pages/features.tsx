import { ArticlePreview } from '@components/ArticlePreview'
import { Hero } from '@components/Hero'
import { Layout } from '@components/Layout'
import { FeaturesQuery } from '@graphqlTypes'
import { PageProps, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Helmet } from 'react-helmet'

import styles from './features.module.scss'

const FeaturesIndex = ({ data }: PageProps<FeaturesQuery>) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const features = get(data, 'allContentfulBlogPost.edges')

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>Features</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent features</h2>
          <ul className="article-list">
            {features.map(({ node }: any) => {
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

export default FeaturesIndex

export const pageQuery = graphql`
  query Features {
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
