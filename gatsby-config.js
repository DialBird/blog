require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.',
  )
}

module.exports = {
  siteMetadata: {
    title: 'Keisuke Blog',
    siteUrl: 'https://coolookoo.work',
    description: 'this is keisuke blog',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Keisuke Portfolio',
        short_name: 'Keisuke',
        start_url: '/',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-scss-typescript',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          '@components': 'src/components',
          '@graphqlTypes': '__generated__/graphqlTypes',
        },
      },
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        codegenPlugins: [
          {
            resolve: 'typescript',
          },
        ],
        fileName: `./__generated__/graphqlTypes.ts`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
