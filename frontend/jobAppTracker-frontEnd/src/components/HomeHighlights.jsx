import { Card, Col, Row, Space, Typography } from "antd";
import {
  BarChartOutlined,
  BellOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HomeHighlights = () => {
  const items = [
    {
      icon: <TeamOutlined style={{ fontSize: 22, color: "#1677ff" }} />,
      title: "Pipeline at a glance",
      text: "Sort every role by stage so you always know where to focus follow-ups.",
    },
    {
      icon: <BellOutlined style={{ fontSize: 22, color: "#52c41a" }} />,
      title: "Deadlines that stick",
      text: "Capture next actions and dates so interviews and offers don't sneak up on you.",
    },
    {
      icon: <BarChartOutlined style={{ fontSize: 22, color: "#faad14" }} />,
      title: "Patterns over time",
      text: "See how your search evolves week to week and adjust your strategy with confidence.",
    },
  ];

  return (
    <section
      aria-label="Job search highlights"
      style={{ marginTop: 8, width: "100%" }}
    >
      <Title
        level={3}
        style={{
          margin: "0 0 8px",
          textAlign: "center",
          fontSize: "clamp(1.25rem, 2.2vw, 1.5rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Make every application count
      </Title>
      <Paragraph
        style={{
          margin: "0 auto 22px",
          maxWidth: 640,
          textAlign: "center",
          fontSize: 15,
          lineHeight: 1.75,
          color: "rgba(15,23,42,0.72)",
        }}
      >
        A few habits turn a messy spreadsheet into a calm, repeatable rhythm.
      </Paragraph>
      <Row gutter={[18, 18]}>
        {items.map(({ icon, title, text }) => (
          <Col xs={24} md={8} key={title}>
            <Card
              variant="borderless"
              style={{
                height: "100%",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.2)",
                boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                {icon}
                <Title level={5} style={{ margin: 0, fontSize: 16 }}>
                  {title}
                </Title>
                <Paragraph
                  style={{
                    margin: 0,
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "rgba(15,23,42,0.78)",
                  }}
                >
                  {text}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default HomeHighlights;
