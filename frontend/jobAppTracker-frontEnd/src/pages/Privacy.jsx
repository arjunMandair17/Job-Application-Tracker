import { Button, Card, Col, Row, Space, Tag, theme, Typography } from "antd";
import {
  HomeOutlined,
  SafetyOutlined,
  FileTextOutlined,
  GlobalOutlined,
  ChromeOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  UserOutlined,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const { Title, Text, Paragraph } = Typography;

const bodyText = { color: "rgba(15,23,42,0.78)", lineHeight: 1.75 };

/** Styled external link that matches Job-Vault's primary blue. */
const PolicyLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#1677ff", fontWeight: 500 }}
  >
    {children}
  </a>
);

/** Renders a single privacy policy section with an icon badge and accent border. */
const PrivacySection = ({ icon, title, accentColor, children }) => (
  <section
    style={{
      padding: "20px 22px",
      borderRadius: 16,
      background:
        "linear-gradient(135deg, rgba(248,250,252,0.98) 0%, rgba(255,255,255,0.96) 100%)",
      border: "1px solid rgba(148,163,184,0.22)",
      borderLeft: `4px solid ${accentColor}`,
      boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 42,
          height: 42,
          borderRadius: 12,
          background: `color-mix(in srgb, ${accentColor} 14%, white)`,
          border: `1px solid color-mix(in srgb, ${accentColor} 28%, transparent)`,
          fontSize: 20,
          color: accentColor,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <Title level={4} style={{ margin: 0, letterSpacing: "-0.01em" }}>
        {title}
      </Title>
    </div>
    {children}
  </section>
);

/** Renders the Job-Vault privacy policy page for the website and Chrome extension. */
const Privacy = () => {
  const navigate = useNavigate();

  const {
    token: {
      colorPrimaryBg,
      colorFillTertiary,
      colorBgContainer,
      colorBorderSecondary,
      colorPrimary,
    },
  } = theme.useToken();

  const highlights = [
    {
      icon: <LockOutlined style={{ fontSize: 22, color: "#1677ff" }} />,
      title: "Your data, your search",
      text: "We only collect what Job-Vault needs to store and sync your applications.",
    },
    {
      icon: <EyeInvisibleOutlined style={{ fontSize: 22, color: "#52c41a" }} />,
      title: "No selling, no ads",
      text: "Your information is never sold or used for unrelated marketing.",
    },
    {
      icon: <CodeOutlined style={{ fontSize: 22, color: "#faad14" }} />,
      title: "Open source",
      text: "Review the full codebase on GitHub anytime you want.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
        backgroundImage: `radial-gradient(120% 90% at 50% -25%, ${colorPrimaryBg} 0%, transparent 52%),
          linear-gradient(180deg, ${colorFillTertiary} 0%, transparent 48%)`,
      }}
    >
      <Button
        type="primary"
        icon={<HomeOutlined />}
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: window.innerWidth < 640 ? 10 : 20,
          left: window.innerWidth < 640 ? 10 : 20,
          zIndex: 20,
          height: window.innerWidth < 640 ? 36 : 40,
          borderRadius: 10,
          fontSize: window.innerWidth < 640 ? 14 : 16,
          boxShadow: `0 8px 20px color-mix(in srgb, ${colorPrimary} 35%, transparent)`,
        }}
      >
        {window.innerWidth < 640 ? "" : "Home"}
      </Button>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "clamp(72px, 12vw, 120px) clamp(16px, 4vw, 32px) 40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            background: colorBgContainer,
            borderRadius: 22,
            border: `1px solid ${colorBorderSecondary}`,
            boxShadow: `0 1px 0 color-mix(in srgb, ${colorPrimary} 12%, transparent) inset,
              0 28px 64px rgba(15, 23, 42, 0.12)`,
            padding: "clamp(24px, 5vw, 40px)",
            overflow: "hidden",
          }}
        >
          {/* Hero header */}
          <div
            style={{
              textAlign: "center",
              margin: "-clamp(24px, 5vw, 40px) -clamp(24px, 5vw, 40px) 28px",
              padding: "clamp(28px, 4vw, 40px) clamp(20px, 4vw, 32px)",
              backgroundImage: `radial-gradient(circle at top, color-mix(in srgb, ${colorPrimary} 13%, transparent), transparent 46%),
                linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(239,246,255,1) 100%)`,
              borderBottom: `1px solid ${colorBorderSecondary}`,
            }}
          >
           

            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Privacy Policy
            </Title>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 13,
                letterSpacing: "0.22em",
              }}
            >
              JOB-VAULT
            </Text>

            <div
              aria-hidden
              style={{
                margin: "18px auto 0",
                height: 1,
                width: "min(240px, 65%)",
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${colorPrimary} 45%, transparent), transparent)`,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 12,
              background: colorPrimaryBg,
              border: `1px solid color-mix(in srgb, ${colorPrimary} 18%, transparent)`,
              marginBottom: 24,
            }}
          >
            <SafetyOutlined style={{ fontSize: 18, color: colorPrimary }} />
            <Text style={{ fontSize: 13, color: "rgba(15,23,42,0.75)" }}>
              This page explains what data Job-Vault collects and how it is used.
            </Text>
          </div>

          {/* Quick highlights */}
          <Row gutter={[16, 16]} style={{ marginBottom: 28 }}>
            {highlights.map(({ icon, title, text }) => (
              <Col xs={24} md={8} key={title}>
                <Card
                  variant="borderless"
                  style={{
                    height: "100%",
                    borderRadius: 14,
                    border: "1px solid rgba(148,163,184,0.2)",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)",
                  }}
                  styles={{ body: { padding: 18 } }}
                >
                  <div style={{ marginBottom: 10 }}>{icon}</div>
                  <Title level={5} style={{ margin: "0 0 6px", fontSize: 15 }}>
                    {title}
                  </Title>
                  <Paragraph style={{ margin: 0, fontSize: 13.5, ...bodyText }}>
                    {text}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="flex flex-col gap-5 text-left">
            <PrivacySection
              icon={<FileTextOutlined />}
              title="Introduction"
              accentColor="#1677ff"
            >
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                Job-Vault is a web app fully developed by Carleton University
                student Arjun Mandair. It allows users to save job applications
                to a personalized dashboard where they can keep track of their
                progress. At Job-Vault, we&apos;re committed to complete user
                security and privacy in the interest of keeping your job search
                personal to you. To that end, this page describes the use case
                of all user data from Job-Vault and its official Chrome
                extension.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<GlobalOutlined />}
              title="Data collected by the website"
              accentColor="#1677ff"
            >
              <Paragraph style={bodyText}>
                Job-Vault keeps track of the username and password that you use
                when creating your account, hashing the password for added
                security. If you choose to sign in with Google OAuth, your email
                and unique Google ID are stored to ensure that your account is
                valid.
              </Paragraph>
              <Paragraph style={bodyText}>
                When saving a job application, all information that you input is
                saved to the database for future use when you want to view or
                update the job status. This includes the role, company, posting
                link, date, status, related notes, and any resume file you
                choose to upload.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                Finally, through the use of a JWT auth workflow, the backend
                creates an auth token by signing your user ID. This token is
                stored in your browser&apos;s local storage for authentication
                purposes and is also used by the official Job-Vault Chrome
                extension to verify that you are signed in.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<ChromeOutlined />}
              title="Data collected by the Chrome extension"
              accentColor="#52c41a"
            >
              <Paragraph style={bodyText}>
                The Job-Vault Chrome extension is designed to work alongside the
                website. After you sign in on the Login page, the website stores
                your JWT auth token in local storage. The extension checks that
                local storage entry to confirm you are authenticated and to
                keep you signed in when using the extension. In Chromium-based
                browsers, the login page may also send the token directly to the
                extension so it can sync your session immediately.
              </Paragraph>
              <Paragraph style={bodyText}>
                When you use the extension to save a job application, it tracks
                details entered from the job posting you are currently viewing —
                such as the job title, company name, and posting URL — only when
                you explicitly choose to save that application. That information
                is sent to the Job-Vault backend and stored in your account, the
                same as if you had entered it on the website.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                The extension does not collect your browsing history, passwords,
                or unrelated personal data from other websites. It only accesses
                the auth token in local storage (after you log in on the
                website) and job-related details from a page when you actively
                use the extension to save an application.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<ApiOutlined />}
              title="How we use your data"
              accentColor="#722ed1"
            >
              <Paragraph style={bodyText}>
                We use your data solely to operate Job-Vault: creating and
                securing your account, storing and displaying your job
                applications, and keeping the website and Chrome extension in
                sync when you are signed in. Your auth token is used only to
                verify your identity when making requests to our backend.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                We do not sell your personal data to third parties. We do not
                use your information for advertising or unrelated marketing
                purposes.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<DatabaseOutlined />}
              title="Data storage and security"
              accentColor="#1677ff"
            >
              <Paragraph style={bodyText}>
                Job application records are stored in a PostgreSQL database.
                Resume files you upload are stored in AWS S3. Authentication is
                handled with JWT tokens, and passwords are hashed before being
                stored — we never save your plain-text password.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                All communication between your browser, the extension, and our
                servers uses HTTPS. Access to your data is restricted to your
                authenticated account. While we take reasonable steps to protect
                your information, no method of transmission or storage over the
                internet is completely secure.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<CloudOutlined />}
              title="Third-party services"
              accentColor="#13c2c2"
            >
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                Job-Vault relies on a small number of third-party services to
                operate: Google (for optional OAuth sign-in), Vercel (frontend
                hosting), Railway (backend hosting and database), and AWS S3
                (resume file storage). Each of these providers processes data
                according to their own privacy policies. Google&apos;s policy
                is available at{" "}
                <PolicyLink href="https://policies.google.com/privacy">
                  policies.google.com/privacy
                </PolicyLink>
                .
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<UserOutlined />}
              title="Your choices and rights"
              accentColor="#faad14"
            >
              <Paragraph style={bodyText}>
                You can view, edit, and delete your job applications at any time
                from the Job-Vault dashboard while signed in. Logging out clears
                the auth token from your browser&apos;s local storage on the
                website.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                You can uninstall the Job-Vault Chrome extension at any time
                from your browser&apos;s extensions settings. Uninstalling
                removes any data the extension stores locally. Data already saved
                to your Job-Vault account on our servers will remain until you
                delete it.
              </Paragraph>
            </PrivacySection>

            <PrivacySection
              icon={<GithubOutlined />}
              title="Open source and transparency"
              accentColor="#0f172a"
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: `linear-gradient(145deg, color-mix(in srgb, ${colorPrimary} 8%, white) 0%, rgba(248,250,252,0.95) 100%)`,
                  border: `1px solid color-mix(in srgb, ${colorPrimary} 16%, transparent)`,
                }}
              >
                <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                  Job-Vault is open source. If you want to understand exactly how
                  your data is handled, you are welcome to review the code
                  yourself on{" "}
                  <PolicyLink href="https://github.com/arjunMandair17/Job-Application-Tracker">
                    GitHub
                  </PolicyLink>
                  . The repository includes the website frontend, backend API,
                  and Chrome extension source.
                </Paragraph>
              </div>
            </PrivacySection>

            <PrivacySection
              icon={<MailOutlined />}
              title="Contact and updates"
              accentColor="#1677ff"
            >
              <Paragraph style={bodyText}>
                If you have questions about this privacy policy or how your data
                is used, you can reach out through{" "}
                <PolicyLink href="https://github.com/arjunMandair17/Job-Application-Tracker/issues">
                  GitHub Issues
                </PolicyLink>{" "}
                on the project repository or connect via the links in the site
                footer.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, ...bodyText }}>
                We may update this policy from time to time. Any changes will be
                posted on this page with an updated date.
              </Paragraph>
              <Text
                type="secondary"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Last updated: June 30, 2026
              </Text>
            </PrivacySection>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
