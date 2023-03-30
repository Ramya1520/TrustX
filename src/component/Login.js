import { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import metamask from './assets/meta.png';
import './Login.css';
import { UserContext } from "../App.js";
import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../web3RPC";

function Login() {

  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  const user = useContext(UserContext).user;
  const setUser = useContext(UserContext).setUser;
  const rpc = useContext(UserContext).rpc;
  const setRPC = useContext(UserContext).setRPC;

  const clientId = process.env.REACT_APP_WEB3AUTH_CLIENTID;

  useEffect(() => {

    if (provider != null || rpc != null) {
      console.log("inside");
      // handleLogin();
    }

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId, 
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["metamask"],
            appLogo: "https://www.spritle.com/images/logo.svg", // Your App Logo Here
          }
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "default", // Pass on the mfa level of your choice: default, optional, mandatory, none
          },
          adapterSettings: {
            whiteLabel: {
              name: "TrustX",
              logoLight: "https://www.spritle.com/images/logo.svg",
              logoDark: "https://www.spritle.com/images/logo.svg",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },
          }
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              // setting it to false will hide all social login methods from modal.
              showOnModal: false,
            },
            [WALLET_ADAPTERS.METAMASK]: {
              label: "metamask",
              showOnModal: true
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "torusevm",
              showOnModal: false
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
              label: "wallerconnectv2",
              showOnModal: false
            }
          },
        });

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [provider, user]);

  const handleLogin = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    
    if (web3authProvider) {
      const rpc_ = new RPC(web3authProvider);

      setUser(await rpc_.getAccounts());
      setRPC(rpc_);
    }
  };

  return (
    <div className="App">
      <div>
        {
          (user === undefined &&
            <Button onClick={handleLogin}> Login</Button>)
          || ((user !== undefined) &&
            <img src={metamask} alt="metamask" className='metaimg' />)
        }
      </div>
    </div>
  )
}
export default Login;