import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center pt-3 gap-3">
        <div className="flex gap-3 items-center">
          <a
            href="https://x.com/PixelPiratesNFT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://discord.gg/Y9KskSJ5WF"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <BsDiscord />
          </a>
          <a
            href="https://yourpixelpirateslink.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition text-xs whitespace-nowrap"
          >
            Pixel Pirates
          </a>
        </div>
        <div className="flex gap-3 items-center">
          <a
            href="/privacy-policy"
            className="hover:text-pink-400 transition text-xs whitespace-nowrap"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-pink-400 transition text-xs whitespace-nowrap"
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center pt-2">
        <img
          key="logo"
          src="/img/PLS_Full_Logo.png"
          alt="logo"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
};

export default Footer;
