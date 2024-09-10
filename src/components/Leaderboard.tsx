import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collapseAddress } from "../core/utils";
import { useKeylessAccounts } from "../core/useKeylessAccounts";
import { Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const APTOS_NETWORK: Network = NetworkToNetworkName[import.meta.env.VITE_APTOS_NETWORK] || Network.TESTNET;

const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { activeAccount } = useKeylessAccounts();
  const [leaderboard, setLeaderboard] = useState([
    { wallet: "0x1", digs: 0 },
    { wallet: "0x1", digs: 0 },
    { wallet: "0x1", digs: 0 },
  ])

  const handleCopy = (walletAddress: string) => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
  };

  const getLeaderBoard = async () => {

    try {
      if (activeAccount) {
        const [result]: any = await aptos.view<[string]>({
          payload: {
            function: `${import.meta.env.VITE_TREASUREHUNT_SC_ADDRESS}::treasurehunt::game_state`,
            functionArguments: []
          }
        })

        const leaderBoardArr = [];
        for (let i in result.users_list) {
          leaderBoardArr.push({
            wallet: result.users_list[i],
            digs: parseInt(result.users_state[i].dig)
          })
        }

        leaderBoardArr.sort((a: { wallet: any; digs: number; }, b: { wallet: any; digs: number; }) => {
          if (a.digs < b.digs) return 1;
          if (a.digs > b.digs) return -1;
          return 0;
        });

        setLeaderboard([...leaderBoardArr]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLeaderBoard();
  }, [])

  return (
    <div className="pt-10 px-5 w-full h-screen flex flex-col items-center max-w-sm bg-yellow-100 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold p-4 border-b font-Blackpearl">Leaderboard</h2>
      <ul className="w-full">
        {leaderboard.filter(entry => entry.wallet !== "0x1").map((entry, index) => (
          <li key={index} className="p-4 border-b flex justify-between text-sm">
            <span>{index + 1}</span>
            <span onClick={() => { handleCopy(entry.wallet) }}>
              {collapseAddress(entry.wallet)}
            </span>
            <span>{entry.digs}</span>
          </li>
        ))}
      </ul>
      <button
        className="flex absolute bottom-5 justify-center text-sm bg-red-50 items-center border border-red-200 rounded-lg px-2 shadow-sm shadow-red-300 hover:bg-red-100 active:scale-95 transition-all"
        onClick={() => navigate("/")}
      >
        close
      </button>
    </div>
  );
};

export default Leaderboard;
