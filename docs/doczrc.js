export default {
    title: "CryptoPal Developer Docs",
    description: "Official docs of the CryptoPal api.",
    themeConfig: {
      initialColorMode: 'dark',
    },
    menu: [
      'CryptoPal API',
      { name: 'How To', menu: ['How it works', 'User', 'Merchant'] },
      { name: 'Catalog Products', menu: ['Products'] },
      { name: 'Identity', menu: ['Userinfo'] },
      { name: 'Orders', menu: ['Orders', 'Custom Objects'] },
      { name: 'Payments', menu: ['Authorizations', 'Captures', 'Refunds', 'Custom Objects'] },
    ]
  }