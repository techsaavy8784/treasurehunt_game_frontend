import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useGesture } from "@use-gesture/react";
import { useKeylessAccounts } from "../core/useKeylessAccounts";
import { Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const APTOS_NETWORK: Network = NetworkToNetworkName[import.meta.env.VITE_APTOS_NETWORK] || Network.TESTNET;

const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

const POWER_UP_DURATIONS: { [key: number]: number } = {
  1.5: 15 * 60, // 15 minutes
  3: 30 * 60, // 30 minutes
  5: 60 * 60, // 60 minutes
};
interface PowerUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPowerUp: (multiplier: number, duration: number) => void;
  activePowerUp: number | null; // Add this prop to track the active power-up
}

const POWER_UPS = [
  {
    plan: 1,
    multiplier: 1.5,
    cost: 250000,
    duration: "15 minutes",
    className: "powerup-1",
    img: "/img/pirate1.png",
  },
  {
    plan: 2,
    multiplier: 3,
    cost: 500000,
    duration: "30 minutes",
    className: "powerup-2",
    img: "/img/pirate2.png",
  },
  {
    plan: 3,
    multiplier: 5,
    cost: 650000,
    duration: "60 minutes",
    className: "powerup-3",
    img: "/img/pirate3.png",
  },
];

const PowerUpModal: React.FC<PowerUpModalProps> = ({
  isOpen,
  onClose,
  onPowerUp,
  activePowerUp, // Use this prop
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { activeAccount } = useKeylessAccounts();

  const bind = useGesture({
    onDrag: ({ direction: [, yDir], velocity: [, yVel] }) => {
      if (yVel > 0.5 && yDir > 0) {
        onClose();
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 500); // Duration of slide-down animation
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const purchasePowerUp = async (plan: number, multiplier: number) => {
    try {
      if (activeAccount) {
        const transaction = await aptos.transaction.build.simple({
          sender: activeAccount.accountAddress,
          data: {
            function: `${import.meta.env.VITE_TREASUREHUNT_SC_ADDRESS}::treasurehunt::purchase_powerup`,
            functionArguments: [plan]
          }
        })

        const senderAuthenticator = aptos.transaction.sign({
          signer: activeAccount,
          transaction,
        })

        const submittedTransaction = await aptos.transaction.submit.simple({
          transaction,
          senderAuthenticator
        });

        const executedTransaction = await aptos.waitForTransaction({ transactionHash: submittedTransaction.hash });
        console.log(executedTransaction);

        onPowerUp(multiplier, POWER_UP_DURATIONS[multiplier]);
      }
    } catch (error) {
      alert("You don't have enough GUI token")
      console.log(error);
    }
  }

  return ReactDOM.createPortal(
    <div
      {...bind()}
      className={`fixed inset-0 flex items-end justify-center z-50 ${isOpen ? "slide-up" : "slide-down"
        } bg-gray-800 bg-opacity-50 transition-transform`}
    >
      <div className="bg-yellow-100 shadow-custom w-full gap-5 rounded-t-lg flex flex-col h-screen justify-center items-center">
        <h2 className="text-2xl font-bold mb-5 font-Blackpearl">Power Ups</h2>
        <h3>Lorem Ipsum</h3>
        {POWER_UPS.map((powerUp, index) => (
          <div
            key={index}
            className={`flex flex-col space-y-2  ${activePowerUp === powerUp.plan ? "blinking-dot" : ""
              }`}
          >
            <div
              key={powerUp.multiplier}
              className={`powerup-item ${powerUp.className}`}
              onClick={() => !activePowerUp && purchasePowerUp(powerUp.plan, powerUp.multiplier)} // Disable click if there's an active power-up
            >
              <button
                className={`text-white px-2 py-1 text-xs rounded-lg transition `}
                disabled={
                  !!activePowerUp && activePowerUp !== powerUp.plan
                } 
              >
                <img src={powerUp.img} className="w-14"></img>
                Speed {powerUp.multiplier}x - Cost:{" "}
                {powerUp.cost.toLocaleString()} $GUI
              </button>
              <div className="powerup-duration">{`Duration: ${powerUp.duration}`}</div>
            </div>
          </div>
        ))}
        <button
          className="md:flex absolute bottom-5 justify-center text-sm bg-red-50 items-center border border-red-200 rounded-lg px-2 shadow-sm shadow-red-300 hover:bg-red-100 active:scale-95 transition-all"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PowerUpModal;
