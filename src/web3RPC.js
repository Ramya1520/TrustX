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

  async addEntity(entityType, details) {
    try {
      var resp = null;
      if (this.contract) {
        switch(entityType.toLowerCase()) {
          case "reviewer":
            resp = await this.contract.methods.addReviewer(details.addr, details.name).send();
            console.log(resp);
            break;
          case "publisher":
            resp = await this.contract.methods.addPublisher(details.addr, details.name).send();
            console.log(resp);
            break;
          case "user":
            resp = await this.contract.methods.addUser(details.addr, details.name).send();
            console.log(resp);
            break;
          case "author":
            resp = await this.contract.methods.addAuthor(details.addr, details.name, details.mail, details.contact).send();
            console.log(resp);
            break;
          default:
            console.log("Not available entitytype");
            return false;
        }
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getEntity(entityType, address) {
    try {
      if (this.contract) {
        let returnable = { status: true };
        switch(entityType.toLowerCase()) {
          case "reviewer":
            returnable.value = await this.contract.methods.getReviewer(address).call();
            break;
          case "publisher":
            returnable.value = await this.contract.methods.getPublisher(address).call();
            break;
          case "user":
            returnable.value = await this.contract.methods.getUser(address).call();
            break;
          case "author":
            returnable.value = await this.contract.methods.getAuthor(address).call();
            break;
          default:
            console.log("Not available entitytype");
            returnable.status = false;
            returnable.error = "Not available entitytype";
            break;
        }
        return returnable;
      }
    } catch (error) {
      console.log(error);
      return {"status": false, "error": error};
    }
  }

  async reviewPaper(paperId, result) {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.getReviewed(paperId, result).send();
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async submitPaper(title, category, contentHash, authors) {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.submitPaper(title, category, contentHash, authors).send({
          value: 1000000000000000
        });
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async voteUp(paperId) {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.voteUp(paperId).send();
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async voteDown(paperId) {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.voteDown(paperId).send();
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async readPaper(paperId) {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.readPaper(paperId).send();
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getRewards() {
    try {
      if (this.contract) {
        var resp = await this.contract.methods.getRewards().send();
        return resp.status;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}