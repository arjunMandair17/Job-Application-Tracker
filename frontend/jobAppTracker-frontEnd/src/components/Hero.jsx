import { Alert, Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import {
  CheckCircleOutlined,
  PlusOutlined,
  FolderOpenOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Hero = ({ onAddApplication, onViewApplications }) => {
  return (
    <>
      <div
        className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-14 text-center"
        style={{
          marginBottom: 24,
          borderRadius: 24,
          border: "1px solid rgba(148,163,184,0.22)",
          boxShadow: "0 20px 50px rgba(15,23,42,0.10)",
          backgroundImage:
            "radial-gradient(circle at top, rgba(59,130,246,0.13), transparent 46%), linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(239,246,255,1) 100%)",
        }}
      >
        <h1 className="text-5xl font-black tracking-[0.15em] uppercase !text-slate-900 drop-shadow-sm">
          Job-Vault
        </h1>
        <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Stay organized, stay ahead.
        </h3>
      </div>


      <Card
        variant="borderless"
        style={{
          marginBottom: 32,
          borderRadius: 20,
          border: "1px solid rgba(148,163,184,0.18)",
          boxShadow: "0 14px 36px rgba(15,23,42,0.07)",
          padding: "18px 10px",
          background:
            "linear-gradient(145deg, rgba(22,119,255,0.08) 0%, rgba(135,208,104,0.09) 100%)",
        }}
      >
        <Space direction="vertical" size={28} style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Space wrap size={12} style={{ justifyContent: "center" }}>
              <Tag
                color="blue"
                style={{ padding: "5px 12px", fontSize: 13, borderRadius: 999 }}
              >
                Focus
              </Tag>
              <Tag
                color="green"
                style={{ padding: "5px 12px", fontSize: 13, borderRadius: 999 }}
              >
                Momentum
              </Tag>
              <Tag
                color="gold"
                style={{ padding: "5px 12px", fontSize: 13, borderRadius: 999 }}
              >
                Interviews
              </Tag>
            </Space>

            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 40,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: 880,
              }}
            >
              Keep your job hunt organized and forward facing.
            </Title>

            <br />

            <Paragraph
              style={{
                margin: 0,
                maxWidth: 900,
                fontSize: 17,
                lineHeight: 1.85,
                color: "rgba(15,23,42,0.86)",
              }}
            >
              Job-Vault helps you capture every application in one
              place, monitor where each role sits in your pipeline, and remember
              key details before follow-ups. Instead of scattered notes and
              tabs, you get a clear system for managing your search from first
              apply to final decision.
            </Paragraph>

            <Paragraph
              style={{
                margin: 0,
                maxWidth: 880,
                fontSize: 16,
                lineHeight: 1.8,
                color: "rgba(15,23,42,0.78)",
              }}
            >
              Whether you are applying to internships, new grad roles, or
              mid-level positions, this app gives you a practical command center
              to stay consistent and lay the foundation for a successful career
              in any field.
            </Paragraph>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Alert
              type="info"
              showIcon
              icon={<ThunderboltOutlined />}
              message="Use this app to track applications, interview stages, deadlines, and next actions."
              style={{ width: "100%", maxWidth: 960 }}
              banner={false}
              className="text-center"
            />
          </div>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: 14,
                  minHeight: 148,
                  border: "1px solid rgba(148,163,184,0.18)",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18, color: "#1677ff" }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7 }}
                  >
                    Log new applications with role, company, and date applied.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: 14,
                  minHeight: 148,
                  border: "1px solid rgba(148,163,184,0.18)",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18, color: "#1677ff" }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7 }}
                  >
                    Update stages like Applied, Interviewing, Offer, or
                    Rejected.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  borderRadius: 14,
                  minHeight: 148,
                  border: "1px solid rgba(148,163,184,0.18)",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18, color: "#1677ff" }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7 }}
                  >
                    Keep notes and follow-up reminders so nothing slips through.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Space size={14} wrap>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onAddApplication}
                style={{
                  borderRadius: 10,
                  minWidth: 176,
                  boxShadow: "0 8px 20px rgba(22,119,255,0.28)",
                }}
              >
                Add Application
              </Button>
              <Button
                size="large"
                icon={<FolderOpenOutlined />}
                onClick={onViewApplications}
                style={{ borderRadius: 10, minWidth: 176 }}
              >
                View Applications
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </>
  );
};

export default Hero;
