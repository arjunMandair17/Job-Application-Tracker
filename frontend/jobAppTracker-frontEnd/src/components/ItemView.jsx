import { Row, Col } from "antd";
const ItemView = ({ items = [] }) => {
  if (!items.length) {
    return <p>You have no applications, consider adding some!</p>;
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
              {typeof item === "object" ? JSON.stringify(item) : String(item)}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ItemView;
