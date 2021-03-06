import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import styles from './ArticlePreview.module.scss'

export const ArticlePreview = ({ article }: any) => (
  <div>
    <Img alt="" fluid={article.heroImage.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
