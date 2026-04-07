import { Row, Col } from "antd";
import JobAppView from "./JobAppView";
const ItemView = ({ items = [] }) => {
  if (!items.length) {
    return <p>Nothing to tell you!</p>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        {items.map((item, index) => (
          <Col key={item?.id ?? index} xs={24} sm={12} md={12} lg={8} xl={6}>
            <div
              style={{
                padding: 12,
                border: "1px solid #d9d9d9",
                borderRadius: 8,
              }}
            >
              <JobAppView item={item} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ItemView;
