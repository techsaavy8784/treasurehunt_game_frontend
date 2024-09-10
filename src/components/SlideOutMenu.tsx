import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useGesture } from "@use-gesture/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import { PiTreasureChestLight } from "react-icons/pi";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
  loggedIn: boolean;
  disconnectWallet: () => void;
  onPowerUpClick: () => void;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({
  isOpen,
  onClose,
  loggedIn,
  onPowerUpClick,
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const bind = useGesture({
    onDrag: ({ direction: [xDir], velocity: [xVel] }) => {
      if (xVel > 0.5 && xDir > 0) {
        onClose();
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 500); // Duration of slide-out animation
    }
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div
      {...bind()}
      className={`fixed inset-0 flex justify-end items-start z-50 transition-transform ${
        isOpen ? "slide-in" : "slide-out"
      } ${isVisible ? "visible" : "slide-out-menu"}`}
    >
      <div className="bg-yellow-100 flex flex-col relative justify-center items-center shadow-xl h-screen gap-20 w-full p-3">
        <div className="flex flex-col justify-center items-center space-y-4 p-15 max-w-sm">
          <div className="w-2/3 mb-10 flex justify-center items-center">
            <img src="/img/images.png" alt="Sample image" />
          </div>
          {loggedIn ? (
            <>
              <button
                onClick={() => navigate("/treasurevault")}
                className="bg-green-500 text-white w-2/3 text-sm py-1 px-1 flex justify-center items-center gap-2 rounded-lg hover:bg-green-700 transition"
              >
                <PiTreasureChestLight />
                Treasure Vault
              </button>
              <button
                onClick={() => navigate("/leaderboard")}
                className="bg-amber-500 text-white w-2/3 text-sm py-1 px-1 flex justify-center items-center gap-2 rounded-lg hover:bg-amber-700 transition"
              >
                <MdOutlineLeaderboard />
                Leaderboard
              </button>
              <button
                onClick={onPowerUpClick}
                className="bg-blue-500 text-white w-2/3 flex justify-center items-center gap-2 text-sm py-1 px-1 rounded-lg hover:bg-blue-700 transition"
              >
                <BsLightningCharge />
                Power Ups
              </button>
              <button
                onClick={() => navigate("/findtreasure")}
                className="bg-fuchsia-500 text-white w-2/3 flex justify-center items-center gap-2 text-sm py-1 px-1 rounded-lg hover:bg-fuchsia-700 transition"
              >
                <IoMdSearch />
                Find Treasure
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-emerald-600 text-white w-2/3 flex justify-center items-center gap-2 text-sm py-1 px-1 rounded-lg hover:bg-emerald-700 transition"
              >
                <LuUserCircle2 />
                Signup
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-500 text-white flex justify-center items-center gap-2 w-2/3 text-sm py-1 px-1 rounded-lg hover:bg-indigo-700 transition"
              >
                <MdOutlineLogin />
                Login
              </button>
              <button
                onClick={() => navigate("/leaderboard")}
                className="bg-amber-500 text-white w-2/3 text-sm py-1 px-1 flex justify-center items-center gap-2 rounded-lg hover:bg-amber-700 transition"
              >
                <MdOutlineLeaderboard />
                Leaderboard
              </button>
              <button
                onClick={onPowerUpClick}
                className="bg-blue-500 text-white w-2/3 flex justify-center items-center gap-2 text-sm py-1 px-1 rounded-lg hover:bg-blue-700 transition"
              >
                <BsLightningCharge />
                Power Ups
              </button>
              <button
                onClick={() => navigate("/findtreasure")}
                className="bg-fuchsia-500 text-white w-2/3 flex justify-center items-center gap-2 text-sm py-1 px-1 rounded-lg hover:bg-fuchsia-700 transition"
              >
                <IoMdSearch />
                Find Treasure
              </button>
            </>
          )}
        </div>
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

export default SlideOutMenu;
