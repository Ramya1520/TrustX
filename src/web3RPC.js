import Web3 from "web3";

export default class EthereumRpc {
  provider = undefined;

  constructor(provider) {
    this.provider = provider;
  }

  getContract(fromAddress) {
    const contractABI = require(process.env.REACT_APP_CONTRACT_ABI);
    const contractADDR = process.env.REACT_APP_CONTRACT_ADDR;

    try {
      const web3 = new Web3(this.provider);

      var contract = new web3.eth.Contract(contractABI.abi, contractADDR, {
        from: fromAddress,
        // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });

      return contract;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getChainId() {
    try {
      const web3 = new Web3(this.provider);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error;
    }
  }

  async getPaperCount(fromAddress) {
    try {
      let contract = this.getContract(fromAddress);
      if (contract) {
        var count = await contract.methods.paperCount().call();
        return count;
      }
    } catch (error) {
      return error;
    }
  }

  async getPublisherHome(fromAddress, flag) {
    try {
      let contract = this.getContract(fromAddress);
      if (contract) {
        var paper_ids = await contract.methods.getPapers(fromAddress, flag).call();
        let papers = [];

        for(let i =0;i<paper_ids.length;i++) {
          let paper = await contract.methods.readPaper_alternate(paper_ids[i]).call();
          papers.push(paper);
        }

        return papers;
      }
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }
}