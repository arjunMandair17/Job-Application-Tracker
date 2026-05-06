import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Spin,
  Empty,
  Tag,
  Divider,
  Row,
  Col,
  Modal,
  message,
} from "antd";
import {
  DownloadOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditApp from "../components/EditApp";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SingleApp() {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const curInput = {
    title: application?.title || "",
    company: application?.company || "",
    date_applied: application?.date_applied || "",
    status: application?.status || "",
    description: application?.description || "",
    application_link: application?.application_link || "",
  };

  useEffect(() => {
    document.body.style.overflow = editing ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editing]);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/jobApps/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setError("Insufficient authorization to view this application");
          return;
        }

        const data = await response.json();
        setApplication(data);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };

    getApplication();
  }, [id]);

  const getStatusColor = (status) => {
    if (!status) return "default";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("applied")) return "blue";
    if (lowerStatus.includes("interview")) return "orange";
    if (lowerStatus.includes("offer")) return "green";
    if (lowerStatus.includes("rejected")) return "red";
    return "default";
  };

  const openExternalLink = (url) => {
    const trimmedUrl = (url || "").trim();
    if (!trimmedUrl) return;

    const normalizedUrl = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    window.open(normalizedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: "20px", fontSize: "16px" }}
        >
          Back
        </Button>

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "500px",
            }}
          >
            <Spin size="large" />
          </div>
        )}

        {!loading && error && (
          <Card>
            <Empty description={error} />
          </Card>
        )}

        {!loading && application && (
          <>
            <Modal
              open={deleteModalOpen}
              okText="Delete"
              cancelText="Cancel"
              title="Are you sure you want to delete this application?"
              onCancel={() => setDeleteModalOpen(false)}
              onOk={async () => {
                try {
                  const response = await fetch(
                    `${BACKEND_URL}/jobApps/${id}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    },
                  );
                  if (!response.ok) {
                    setError("Failed to delete application");
                    return;
                  }
                  message.success("Application deleted successfully");
                  setDeleteModalOpen(false);

                  // If deletion is successful, navigate back to the list page
                  navigate("/");
                } catch (error) {
                  console.error("Error deleting application:", error);
                }
              }}
            >
              <p>This action cannot be undone.</p>
              <p>
                Any and all data associated with the application will be lost.
              </p>
            </Modal>

            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => setEditing((prev) => !prev)}
              style={{ marginBottom: "20px" }}
            >
              {editing ? "Cancel Editing" : "Edit"}
            </Button>

            <Button
              type="default"
              icon={<DeleteOutlined />}
              danger
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
            </Button>

            {editing ? (
              <EditApp id={id} curInput={curInput} />
            ) : (
              <Card
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                {/* Header Section */}
                <Row
                  gutter={[24, 24]}
                  align="middle"
                  justify="center"
                  style={{ marginBottom: "24px", textAlign: "center" }}
                >
                  <Col xs={24}>
                    <div>
                      <h1
                        style={{
                          fontSize: "32px",
                          fontWeight: "bold",
                          margin: "0 0 8px 0",
                          color: "#1890ff",
                        }}
                      >
                        {application.title}
                      </h1>
                      <p
                        style={{
                          fontSize: "24px",
                          margin: "0 0 16px 0",
                          color: "#ff7a45",
                          fontWeight: "500",
                        }}
                      >
                        at {application.company}
                      </p>
                      {application.status && (
                        <Tag
                          color={getStatusColor(application.status)}
                          style={{ fontSize: "14px", padding: "4px 12px" }}
                        >
                          {application.status}
                        </Tag>
                      )}
                    </div>
                  </Col>
                </Row>

                <Divider />

                {/* Details Section */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
                    <div>
                      <h3 style={{ color: "#595959", marginBottom: "8px" }}>
                        Date Applied
                      </h3>
                      <p style={{ fontSize: "16px", margin: "0" }}>
                        {application.date_applied
                          ? new Date(
                              application.date_applied,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </p>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div>
                      <h3 style={{ color: "#595959", marginBottom: "8px" }}>
                        Status
                      </h3>
                      <p style={{ fontSize: "16px", margin: "0" }}>
                        {application.status || "Not set"}
                      </p>
                    </div>
                  </Col>
                </Row>

                <Divider />

                {/* Description Section */}
                <div>
                  <h3 style={{ color: "#595959", marginBottom: "12px" }}>
                    Description / Notes
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#262626",
                    }}
                  >
                    {application.description || "No description provided"}
                  </p>
                </div>

                <Divider />

                {/* Application Link Section */}
                {application.application_link && (
                  <div>
                    <h3 style={{ color: "#595959", marginBottom: "12px" }}>
                      Job Posting Link
                    </h3>
                    <Button
                      type="primary"
                      onClick={() =>
                        openExternalLink(application.application_link)
                      }
                    >
                      View Job Posting
                    </Button>
                  </div>
                )}

                {!application.application_link && (
                  <div>
                    <h3 style={{ color: "#595959", marginBottom: "12px" }}>
                      Job Posting Link
                    </h3>
                    <p style={{ color: "#8c8c8c" }}>No link provided</p>
                  </div>
                )}

                <Divider />

                {/* Resume Section */}
                {application.resumeUrl && (
                  <div>
                    <h3 style={{ color: "#595959", marginBottom: "12px" }}>
                      Resume
                    </h3>
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      size="large"
                      onClick={() =>
                        window.open(application.resumeUrl, "_blank")
                      }
                    >
                      View Resume
                    </Button>
                  </div>
                )}

                {!application.resumeUrl && (
                  <div>
                    <h3 style={{ color: "#595959", marginBottom: "12px" }}>
                      Resume
                    </h3>
                    <p style={{ color: "#8c8c8c" }}>No resume attached</p>
                  </div>
                )}
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
