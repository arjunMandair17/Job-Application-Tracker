import { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { ChromeOutlined } from "@ant-design/icons";

const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/job-vault-official-chrome/ajhckedidlpffhaboemclmggoobmlomd";
const STORAGE_KEY = "jobVaultExtensionAnnouncementDismissed";

/**
 * Shows a one-time announcement modal for the Job-Vault Chrome extension.
 * Dismissal is persisted in localStorage so returning visitors are not interrupted.
 */
const ExtensionAnnouncement = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  /** Persists dismissal and closes the modal. */
  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Modal
      title={
        <span className="inline-flex items-center gap-2">
          <ChromeOutlined />
          Job-Vault Chrome Extension
        </span>
      }
      open={open}
      onCancel={handleDismiss}
      footer={[
        <Button key="dismiss" onClick={handleDismiss}>
          Maybe later
        </Button>,
        <Button
          key="install"
          type="primary"
          icon={<ChromeOutlined />}
          href={CHROME_EXTENSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDismiss}
        >
          Get the extension
        </Button>,
      ]}
    >
      <Typography.Paragraph style={{ marginBottom: 0 }}>
        The official Job-Vault Chrome extension is now available on the Chrome
        Web Store. Save job applications from any tab without leaving the page
        you&apos;re on.
      </Typography.Paragraph>
    </Modal>
  );
};

export default ExtensionAnnouncement;
export { CHROME_EXTENSION_URL };
