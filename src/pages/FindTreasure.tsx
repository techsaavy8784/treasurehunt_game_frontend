import React from "react";
import { useNavigate } from "react-router-dom";

const FindTreasure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-100 pt-5 px-5 max-w-sm h-screen flex flex-col justify-center items-center">
      <div className="text-center text-xs mb-5 flex items-center justify-center">
        <img
          src="/img/captain.png"
          alt="Treasure Vault"
          className="w-10 h-10"
        />
        <div>
          <p>Treasure Hunt is an entirely on chain based multiplayer game.</p>
          <p>
            From the map of squares, to the randomness used for digging, to the
            dig action, the rewards, and more are all done through smart
            contracts on Aptos Move.
          </p>
          <p>
            Each and every action you take is on chain to ensure your gameplay
            is directly connected to your Treasure Vault.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {/* Step 1 */}
        <div className="flex items-center space-x-4">
          <img
            src="/img/treasure-vault.png"
            alt="Treasure Vault"
            className="w-16 h-16"
          />
          <div>
            <h2 className="text-lg">Step 1 - Treasure Vault</h2>
            <p className="text-xs">
              Using Keyless you can create or connect to your Treasure Vault.
              This way your gameplay is always tracked to your Treasure Vault.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-4">
          <img src="/img/shekels.png" alt="Add Shekels" className="w-16 h-16" />
          <div>
            <h2 className="text-lg">Step 2 - Add Shekels</h2>
            <p className="text-xs">Add APT to your Treasure Vault to play.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <img src="/img/dig.png" alt="Add Shekels" className="w-36 h-16" />
          </div>
          <div>
            <h2 className="text-lg">Step 3 - DIG!</h2>
            <p className="text-xs">
              Each Dig is an on chain txn. Each dig will cost you a little APT
              and for gas. Each dig contributes to your total daily dig count.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-center space-x-4">
          <img src="/img/pool.png" alt="The Pool" className="w-16 h-16" />
          <div>
            <h2 className="text-lg">Step 4 - The Pool</h2>
            <p className="text-xs">
              Every Power Up purchase automagically gets added to the Daily
              Reward Pool.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-center space-x-4">
          <img
            src="/img/treasure.png"
            alt="AHOY! Treasure"
            className="w-16 h-16"
          />
          <div>
            <h2 className="text-lg">Step 5 - AHOY! Treasure</h2>
            <p className="text-xs">
              Every 24 hours 80% of the total reward pool will be redistributed
              back to every Captain who played that day. The distribution will
              be based on your daily dig count.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center my-3">
        <button
          className="flex absolute bottom-5 justify-center text-sm bg-red-50 items-center border border-red-200 rounded-lg px-2 shadow-sm shadow-red-300 hover:bg-red-100 active:scale-95 transition-all"
          onClick={() => navigate("/")}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default FindTreasure;
