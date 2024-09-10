import React, { useState } from "react";
import { useKeylessAccounts } from "../core/useKeylessAccounts";
import {CopyOutlined, CopyFilled} from '@ant-design/icons';

const Deposit: React.FC = () => {
  const { activeAccount } = useKeylessAccounts();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const address = activeAccount?.accountAddress?.toString() || "";
    navigator.clipboard.writeText(address);
    setCopied(true);
  };

  return (
    <div className="h-screen bg-yellow-100 flex flex-col w-full justify-center items-center pt-10">
      <h1 className="text-xl font-bold mb-4">Deposit</h1>
      <div className="bg-yellow-100 p-10 rounded-lg w-full max-w-sm mb-8">
        <div className="mb-4 text-sm">
          <label className="block font-bold mb-1">Address:</label>
          <div className="flex items-center">
            <span className="break-all">
              {activeAccount?.accountAddress?.toString()}
            </span>
            <button
              onClick={handleCopy}
              className="ml-2 my-5 text-sm text-blue-500 hover:text-blue-700"
            >
              {copied ? <CopyFilled /> : <CopyOutlined />}
            </button>
          </div>
          <p className="mt-2 text-sm text-center text-gray-600">
            Only deposit APT, $GUI, and approved NFTs.
          </p>
        </div>
      </div>
      <button
        className="flex justify-center text-sm bg-red-50 items-center border border-red-200 rounded-lg px-2 shadow-sm shadow-red-300 hover:bg-red-100 active:scale-95 transition-all"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default Deposit;
