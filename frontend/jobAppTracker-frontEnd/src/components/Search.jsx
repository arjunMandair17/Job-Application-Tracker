import { Form, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const Search = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="!flex !items-center !justify-center !gap-4 !mb-4 !flex-wrap">
      <Form
        layout="inline"
        className="!flex !items-center !justify-center !flex-none"
      >
        <SearchOutlined className="!text-4xl !mr-3" />
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            size="large"
            placeholder="Search job applications"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!w-[720px] !max-w-[90vw] !h-12 !text-base"
          />
        </Form.Item>
      </Form>

      <div className="!flex !items-center !flex-none">{children}</div>
    </div>
  );
};

export default Search;
