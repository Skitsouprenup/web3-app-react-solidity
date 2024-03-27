# web3-app-react-solidity
A Simple and responsive blockchain app using react as frontend, solidity for
interaction with the blockchain and hardhat for deploying and testing solidity
contracts.

I have a demo video of this project in this [link](https://youtu.be/K3apk2Yfw7Y)

# Technologies Used
* **Typescript**
* **React**
* **SCSS**
* **Solidity**
* **Hardhat**

# Testing this project
You can clone this project and test it for yourself. However, You need to deploy
the 'Transaction.sol' contract first. Then, copy the generated `<contract-name>.json`
file in `artifacts/contracts/<contract-name>.sol` directory. 

**Note:** It's better copy the generated file once you deploy the contract in sepolia testnet blockchain not when your contract is deployed to localhost. See 'notes' section below for more information.

Past the generated file to 'client/web3-app/src/utils/transactions' directory. Create
the directory if it doesn't exist. Also, copy the contract address that will appear on the terminal once the deployment is complete. Create 'constants.ts' file in the 'client/web3-app/src/utils/transactions' directory.

In constants.js, declare 'contractAddress' variable and put the contract address here.  
Example: `export const contractAddress='contract-address';`  
Next, declare 'abi' variable, import the generated `<contract-name>.json` file into
constants.js and get the abi property there.  
Example:  
`import transactions from './Transaction.json'`  
`export const abi = transactions.abi;`

## Envs
These are the properties of env in frontend:  
VITE_GIPHY_API -> API key for giphy.

These are the properties of env in the `smart_contract` directory:  
SEPOLIA_URL -> Sepolia testnet RPC endpoint of your provider. Visit [alchemy](https://www.alchemy.com/) and register an account there to create an RPC endpoint. If you're like me and can't register to alchemy due to phone verification not working, there are alternatives. When I created this project, I used [blastapi](https://blastapi.io/).  
SECRET_KEY -> secret key of your RPC endpoint that provided by the provider of your endpoint.

## Notes
Before we deploy our contract to a network, we can test our contract in our machine first. To do this, go to the 'smart_contract' directory and type this command:  
`npx hardhat node`

The command above emulates a network in our local machine. Then, open a new terminal. Next, deploy our contract to our machine to test if it can be successfully deployed. To do this, type this command in the newly created terminal:  
`scripts/deploy.js --network localhost`  
This command deploys our contract into our localhost.

If your contract is successfully deployed, we can now safely deploy our contract to sepolia network. In this step, we can stop the running server that's created by `npx hardhat node` command. Now, to deploy our contract to sepolia network, type this command:  
`scripts/deploy.js --network sepolia`  
This command deploys our contract into sepolia network.

Note that the above deployments are for testing purposes only. If you want to create a real-world blockchain app, you should deploy your contract to 'Ethereum mainnet' network, assuming you're using ethereum.

Also, you must have a sepolia token in your metamask account in order to do transaction testing. Just look for 'sepolia faucet' on the internet.