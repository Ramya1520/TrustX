import Web3 from "web3";

export default class EthereumRpc {

  constructor(provider) {
    this.provider = provider;
    this.getAccounts().then((user) => {
      this.contract = this.getContract(user);
    });
  }

  getContract(fromAddress) {
    const contractABI = require(process.env.REACT_APP_CONTRACT_ABI);
    const contractADDR = process.env.REACT_APP_CONTRACT_ADDR;

    try {
      const web3 = new Web3(this.provider);

      let contract = new web3.eth.Contract(contractABI.abi, contractADDR, {
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

  async getPaperCount() {
    try {
      if (this.contract) {
        var count = await this.contract.methods.paperCount().call();
        return count;
      }
    } catch (error) {
      return error;
    }
  }

  async getPublisherHome(fromAddress, flag) {
    try {
      if (this.contract) {
        var paper_ids = await this.contract.methods.getPapers(fromAddress, flag).call();
        let papers = [];

        for(let i =0;i<paper_ids.length;i++) {
          let paper = await this.contract.methods.readPaper_alternate(paper_ids[i]).call();
          papers.push(paper);
        }

        return papers;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async publishPaper(paperId) {
    try {
      if (this.contract) {
        await this.contract.methods.publishPaper(paperId).call();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addAuthor() {
    try {

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}