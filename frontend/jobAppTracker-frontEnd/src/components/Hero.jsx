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
      <style>{`
        .hero-fade-up {
          opacity: 0;
          transform: translateY(10px);
          animation: heroFadeUp 500ms ease forwards;
        }

        .hero-intro {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-delay-1 { animation-delay: 100ms; }
        .hero-delay-2 { animation-delay: 180ms; }
        .hero-delay-3 { animation-delay: 260ms; }

        @keyframes heroFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
          <div className="hero-intro">
            <Space
              wrap
              size={10}
              className="hero-fade-up"
              style={{ justifyContent: "center" }}
            >
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
              className="hero-fade-up hero-delay-1"
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
              className="hero-fade-up hero-delay-1"
            >
              Job Application Tracker helps you capture every application in one
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
              className="hero-fade-up hero-delay-2"
            >
              Whether you are applying to internships, new grad roles, or
              mid-level positions, this app gives you a practical command center
              to stay consistent and keep your opportunities moving.
            </Paragraph>
          </div>

          <Alert
            className="hero-fade-up hero-delay-2"
            type="info"
            showIcon
            icon={<ThunderboltOutlined />}
            message="Use this app to track applications, interview stages, deadlines, and next actions."
          />

          <Row gutter={[20, 20]} className="hero-fade-up hero-delay-2">
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

          <Space size={14} wrap className="hero-fade-up hero-delay-3">
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
        </Space>
      </Card>
    </>
  );
};

export default Hero;
