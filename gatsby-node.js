const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            title
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
