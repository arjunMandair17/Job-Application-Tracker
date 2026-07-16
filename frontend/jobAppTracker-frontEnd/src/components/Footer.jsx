import {
  GithubOutlined,
  LinkedinFilled,
  InstagramFilled,
  ChromeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CHROME_EXTENSION_URL } from "./ExtensionAnnouncement";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white">
      <div className="flex space-x-4 mt-2">
        <GithubOutlined
          className="text-2xl cursor-pointer"
          onClick={() =>
            window.open("https://github.com/arjunMandair17", "_blank")
          }
        />
        <LinkedinFilled
          className="text-2xl cursor-pointer"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/arjun-mandair-9b4a70378",
              "_blank",
            )
          }
        />
        <InstagramFilled
          className="text-2xl cursor-pointer"
          onClick={() =>
            window.open("https://www.instagram.com/arjun.m.4/", "_blank")
          }
        />
      </div>

      <p>
        Job-Vault &copy; 2026, developed by Arjun Mandair. All rights reserved.
      </p>
      <p>Frontend using React, Tailwind CSS, and AntDesign.</p>

      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <a
          href={CHROME_EXTENSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-300 underline underline-offset-2 transition-colors hover:text-white"
        >
          <ChromeOutlined />
          Chrome Extension
        </a>
        <Link
          to="/privacy"
          className="text-gray-300 underline underline-offset-2 transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
