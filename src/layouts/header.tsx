import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onHamburgerClick: () => void;
  walletConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onHamburgerClick,
  walletConnected,
}) => {
  const navigate = useNavigate();
  return (
    <header className="w-full py-2 px-1 flex justify-between items-center">
      <h1 className="text-md font-bold">On Chain Treasure Hunt</h1>
      <div className="flex items-center justify-end gap-3">
        {walletConnected ? (
          <button onClick = {() => {
            navigate('/treasurevault')
          }}>
            <img src="/img/treasure1.png" className="w-7 h-7"></img>
          </button>
        ) : (
          <button onClick = {() => {
            navigate('/login')
          }}>
            <img src="/img/treasure2.png" className="w-7 h-7"></img>
          </button>
        )}
        <button onClick={onHamburgerClick} className="text-2xl">
          &#9776;
        </button>
      </div>
    </header>
  );
};

export default Header;
