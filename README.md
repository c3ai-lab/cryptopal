# Welcome to Cryptopal!

Cryptopal is a provider for online cryptocurrency payments with stable coins. It makes payments on any network running the EVM (Ethereum virtual machine) with any ERC20 token possible. The service uses custodial wallets to make payments with cryptocurrency as easy as possible for the user. The user only needs to care about the logging in credentials to use the advantages of blockchain technologies.

The project is splitted into four parts: Frontend, Backend, WooCommerce plugin and Documentation.

## Frontend

The frontend shows basic data depending on the user. The user can sign up, log in and update all personal data. It is also possible to send transactions to other registered users of the service by entering their email address or to send payments to external wallets by entering an Ethereum address directly.

After logging in the user can also see a transaction history and all details of single transactions with an additional reference to the given transaction on chain.

### Configure Frontend

The Frontend repository holds a .env.example file. It is necessary to create an .env file based on this file with the custom configuration.

> The most important variable is **REACT_APP_SERVER_API** to make the service running.

**REACT_APP_SERVER_API** should be an URL referencing to the running backend.

> The network and explorer variables are needed, if you want to access the on chain data via an explorer.

The explorer variables are predefined for sokol and kovan testnet. You can enter a custom explorer address. To select the right explorer set the **REACT_APP_NETWORK** variable.

Possible values are: **SOKOL**, **KOVAN** or **CUSTOM**.

## Backend

The Backend folder hold the main logic of the service. By the registration of a user, the service automatically generates a key pair with a public and private key of its Ethereum wallet. The keys are stored safely in the database. By sending a payment, the backend fetches the keys from database and sends automatically a transaction by signing it for the user with the given data. This makes chain access possible without the user having to care about signing transactions. The first 10 accounts are pre-reserved for the service. The fist address for example is the faucet, holding the initial amount of the tokens making users able to request tokens. The other addresses could be used for collecting different fees or donations.

The Backend has many API endpoints which are very similar to the PayPal API to provide an easy to use interface for programmers. It makes it easy to implement the service if PayPal has already been used. The API includes functionalities as making orders by the merchants and authorize payments by the users. So this service can be fully used by merchants to enable cryptocurrency payments. A full documentation of the API can be found below in the section Live Demo.

### Configure Backend

To make the access to the Ethereum blockchain possible, it is necessary to create an **.env** file based on the .env.example file in the backend repository. The you can define the network you want to run the service on and provide the blockchain related data making transactions possible.

The following variables have to be set:

- **DB_CONNECTION** - a connection string to a mongo database

- **TOKEN_SECRET_AUTH** - a secret string to create JWT for authorization on API routes

- **TOKEN_SECRET_CONFIRM** - a secret string to create JWT for email confirmation at registration

- **SECRET_PRIVATE_KEY** - a secret string to encode/decode the stored private keys of the wallets

- **SERVER_URL** - the URL where this service is running on

- **FRONTEND_URL** - the URL where the frontend is running on for redirections

- **EMAIL_PROVIDER** - the prodiver of the email account to send email from for the service

- **EMAILADDRESS_SENDER** - email address of an email account for the service. This account is sending emails for verification when users are signing up or changing passwords.

- **EMAILADDRESS_SENDER** - password related to the email account

- **NETWORK** - the selected blockchain network the service should be running on. Possible values are SOKOL, KOVAN, LOCALHOST, CUSTOM

- **NETWORK_COSTUM** - You can provide here a custom RPC-address of an Ethereum blockchain network. You can connect to it by setting NETWORK to CUSTOM.

- **DAI_CONTRACT_LOCAL** - the address of the erc20 token smart contract deployed on local network.

- **DAI_CONTRACT_KOVAN** - the address of the erc20 token smart contract deployed on kovan testnet.

- **DAI_CONTRACT_SOKOL** - the address of the erc20 token smart contract deployed on sokol testnet.

- **DAI_CONTRACT_CUSTOM** - the address of the erc20 token smart contract deployed on custom network.

- **MNEMONIC** - the seed of the Ethereum account generating all wallets

- **FAUCET_ADDRESS** - the address of the account holding the initial amount of the erc20 token acting as a faucet.

- **FAUCET_PRIVATE_KEY** - the encrypted private key of the faucet account to make signing transactions possible (has to be encrypted with the SECRET_PRIVATE_KEY)

### API Callflow

The API can be used by merchants to provide cryptocurrency payment to the user.

![alt text](https://github.com/c3ai-lab/cryptopal/blob/master/diagram.png)

## API Documentation

The Docs repository holds the documentation of the Cryptopal api. The API is very similar to the PayPal API and easy to use straight away. It was created with React and Gatsby and serves only statical content. It is written with a mixture of HTML, Javascript and Markdown. A reference to the live demo can be found below.

## WooCommerce Plugin

The cryptopal-payment-gateway file hold the sourcecode for the WooCommerce plugin to integrate CryptoPal to a WooCommerce shop. It is the easiest way to integrate the described callflow of the CryptoPal API. The merchant has to get the merchant role on the CryptoPal website, install the plugin and configure the plugin settings with his credentials to enable CryptoPal payments on the shop.

## Live demos

As a live demonstration of the service we use the sokol test network and Dai-ERC20 token for transferring value due to liquity. To explore the functions of Cryptopal you can have a look at the live demos provided at the following urls:

live frontend demo: https://bluecryptopal.com

live docs demo: https://docs.bluecryptopal.com

WoCommerce shop with CryptoPal payment gateway integration: http://b9z69f6.myraidbox.de/

G-drive with planning docs for the project:

https://drive.google.com/drive/folders/1Rd80vIY1lRXiQk9GM_K8-pPq-Lz43rx4
