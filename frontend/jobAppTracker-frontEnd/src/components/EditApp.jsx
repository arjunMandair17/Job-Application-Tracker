import { Input, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;


    

const EditApp = ({ id, curInput }) => {
    
    const [title, setTitle] = useState(curInput.title);
    const [company, setCompany] = useState(curInput.company);
    const [dateApplied, setDateApplied] = useState(curInput.date_applied);
    const [status, setStatus] = useState(curInput.status);
    const [description, setDescription] = useState(curInput.description);
    const [applicationLink, setApplicationLink] = useState(curInput.application_link);
    const [resumeFile, setResumeFile] = useState(null);

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

        const response = await fetch(backendURL + "/jobApps/" + id, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            message.error(error.error || error.message || "Failed to add application");
            return;
        }

        message.success("Edits applied successfully");
        setTitle("");
        setCompany("");
        setDateApplied("");
        setStatus("");
        setDescription("");
        setApplicationLink("");
        setResumeFile(null);
    };
    return (
        <>

            <h1 className="!text-3xl !font-bold !text-blue-500 !mb-4 !text-center"> 
                Edit Job Application: 
            </h1>

            <Form
                className="!max-w-2xl !mx-auto !p-6 !bg-white !rounded-lg !shadow-md !flex !flex-col !gap-4"
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
                        Submit Changes
                    </Button>

            </Form>

        </>

    )

};
export default EditApp;