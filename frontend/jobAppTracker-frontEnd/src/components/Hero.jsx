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
        className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 text-center"
        style={{
          marginBottom: 18,
          borderRadius: 20,
          border: "1px solid rgba(148,163,184,0.25)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
          backgroundImage:
            "radial-gradient(circle at top, rgba(59,130,246,0.10), transparent 40%), linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(239,246,255,1) 100%)",
        }}
      >
        <h1 className="text-5xl font-black tracking-[0.18em] uppercase !text-slate-900 drop-shadow-sm">
          Job-Vault
        </h1>
        <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
          Stay organized, stay ahead.
        </h3>
      </div>


      <Card
        variant="borderless"
        style={{
          marginBottom: 32,
          borderRadius: 16,
          padding: "14px 8px",
          background:
            "linear-gradient(135deg, rgba(22,119,255,0.07) 0%, rgba(135,208,104,0.08) 100%)",
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
            <Space wrap size={10} style={{ justifyContent: "center" }}>
              <Tag color="blue" style={{ padding: "4px 10px", fontSize: 14 }}>
                Focus
              </Tag>
              <Tag color="green" style={{ padding: "4px 10px", fontSize: 14 }}>
                Momentum
              </Tag>
              <Tag color="gold" style={{ padding: "4px 10px", fontSize: 14 }}>
                Interviews
              </Tag>
            </Space>

            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 42,
                lineHeight: 1.15,
                maxWidth: 920,
              }}
            >
              Keep your job hunt organized and forward facing.
            </Title>

            <br></br>

            <Paragraph
              style={{
                margin: 0,
                maxWidth: 960,
                fontSize: 18,
                lineHeight: 1.8,
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
                maxWidth: 940,
                fontSize: 17,
                lineHeight: 1.8,
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
              className="text-center"
            />
          </div>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <Card
                style={{ borderRadius: 12, minHeight: 148 }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18 }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 16, lineHeight: 1.7 }}
                  >
                    Log new applications with role, company, and date applied.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{ borderRadius: 12, minHeight: 148 }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18 }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 16, lineHeight: 1.7 }}
                  >
                    Update stages like Applied, Interviewing, Offer, or
                    Rejected.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{ borderRadius: 12, minHeight: 148 }}
                bodyStyle={{ padding: 18 }}
              >
                <Space size={12}>
                  <CheckCircleOutlined style={{ fontSize: 18 }} />
                  <Paragraph
                    style={{ margin: 0, fontSize: 16, lineHeight: 1.7 }}
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
              >
                Add Application
              </Button>
              <Button
                size="large"
                icon={<FolderOpenOutlined />}
                onClick={onViewApplications}
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
