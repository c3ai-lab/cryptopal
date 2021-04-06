const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'CryptoPal Developer Docs',
    description: 'Official docs of the CryptoPal api.',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: { initialColorMode: 'dark' },
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'CryptoPal Developer Docs',
        description: 'Official docs of the CryptoPal api.',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app',
          templates:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz',
          cache:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\.cache',
          app:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app',
          appPackageJson:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\package.json',
          appTsConfig:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\tsconfig.json',
          gatsbyConfig:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app\\index.html',
          db:
            'C:\\Users\\larsr\\Documents\\fh\\Bachelor\\project\\my-docz-app\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
