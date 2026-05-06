import { GithubOutlined } from "@ant-design/icons";
import { LinkedinFilled } from "@ant-design/icons";
import { InstagramFilled } from "@ant-design/icons";

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white">
            <p>
                Job-Vault &copy; 2026, developed by Arjun Mandair. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2">
                <GithubOutlined className="text-2xl cursor-pointer" onClick={() => window.open("https://github.com/arjunMandair17", "_blank")} />
                <LinkedinFilled className="text-2xl cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/arjun-mandair-9b4a70378", "_blank")} />
                <InstagramFilled className="text-2xl cursor-pointer" onClick={() => window.open("https://www.instagram.com/arjun.m.4/", "_blank")} />
            </div>
        </div>
    );
}

export default Footer;