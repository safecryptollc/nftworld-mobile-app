import React, { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";

import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user, isAuthenticated } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  useEffect(() => {

    Moralis.Web3.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.Web3.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  // useMemo(
  //   () =>
  //     setWalletAddress(
  //       web3.givenProvider?.selectedAddress || user?.get("avaxAddress")
  //     ),
  //   [web3, user]
  // );




  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId }}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
