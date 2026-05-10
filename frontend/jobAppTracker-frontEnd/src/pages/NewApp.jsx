import { Input, Button, Form, Upload, message } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoAuth from "../components/NoAuth";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NewApp = ({ isAuth }) => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [applicationLink, setApplicationLink] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("company", company);
        formData.append("description", description);
        formData.append("date_applied", dateApplied);
        formData.append("status", status);
        formData.append("application_link", applicationLink);

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/jobApps`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            message.error(error.error || error.message || "Failed to add application");
            return;
        }

        message.success("Job application added successfully");
        setTitle("");
        setCompany("");
        setDateApplied("");
        setStatus("");
        setDescription("");
        setApplicationLink("");
        setResumeFile(null);
    };

    if (!isAuth) {
        return (
            <NoAuth 
                title="Sign in to store a new job application!"
                innerText="Sign in to organize your job search, all in one place."
            />
        );
  }

    return (
        <>

            <h1 className="!text-3xl !font-bold !text-blue-500 !mb-4 !text-center"> 
                Add a new Job Application: 
            </h1>

            <Form
                layout={window.innerWidth < 768 ? "vertical" : "vertical"}
                className="!mx-auto !bg-white !rounded-lg !shadow-md !flex !flex-col !gap-4"
                style={{ maxWidth: window.innerWidth < 768 ? "95%" : "640px", padding: window.innerWidth < 768 ? "16px" : "24px" }}
                onFinish={handleSubmit}
            >

                    <h4>Position</h4>
                    <Input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <h4>Company Name</h4>
                    <Input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
                    
                    <h4>Date Applied</h4>
                    <Input placeholder="Date Applied" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} />

                    <h4>Status</h4>
                    <Input placeholder="ex: Applied, Interviewing, Offer Received" value={status} onChange={(e) => setStatus(e.target.value)} />

                    <h4>Notes</h4>
                    <Input.TextArea 
                        placeholder="Job description, or any relevant notes" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        style={{ resize: 'vertical' }}
                    />
                    
                    <h4>Job Application Link</h4>
                    <Input placeholder="https://example.com/job-posting" value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} />
                    
                    <div className="!flex !flex-col !gap-2 !text-center !text-lg">
                        <h4>Upload Resume</h4>

                        <Upload
                            accept=".pdf,.doc,.docx"
                            beforeUpload={(file) => {
                                setResumeFile(file);
                                return false;
                            }}
                            maxCount={1}
                            fileList={resumeFile ? [resumeFile] : []}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>

                    </div>
    


                    <Button type="primary" size="large" htmlType="submit" className="!px-6 !h-12 !text-lg text-white !bg-blue-600 hover:!bg-blue-700 !w-60 !self-center">
                        Add Application
                    </Button>

            </Form>

        </>

    )
}

export default NewApp;