const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const queryArgument =
    process.env.NODE_ENV === 'production'
      ? 'sort: { order: DESC, fields: [publishDate] }'
      : 'sort: { order: DESC, fields: [publishDate] }, filter: { isSample: { eq: true } }'
  const result = await graphql(`
    {
      allContentfulBlogPost(${queryArgument}) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // createRedirect({
  //   fromPath: '/blog/page/1',
  //   isPermanent: true,
  //   redirectInBrowser: true,
  //   toPath: '/blog',
  // })

  const posts = result.data.allContentfulBlogPost.edges
  posts.forEach((post) => {
    createPage({
      path: `/blog/${post.node.slug}/`,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: post.node.slug,
      },
    })
  })
}
