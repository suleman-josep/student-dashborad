// StudentDashboard.js
import React from "react";
import { Table, Button, Modal, Form, Input, Spin, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import useStudentDashboard from "../../Hooks/StudentDashboard/useStudentDashboard";
import "../../App.css";

const StudentDashboard = () => {
  const {
    handleUpload,
    showModal,
    loading,
    students,
    columns,
    isEditing,
    isModalVisible,
    handleOk,
    handleCancel,
    saving,
    form,
  } = useStudentDashboard();

  return (
    <div>
      <Upload customRequest={handleUpload} accept=".csv" showUploadList={false}>
        <Button className="student-dashborad-btn" icon={<UploadOutlined />}>Import CSV</Button>
      </Upload>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Student
      </Button>
      {loading ? (
        <Spin tip="Loading students..." />
      ) : (
        <Table dataSource={students} columns={columns} rowKey="id" />
      )}

      <Modal
        title={isEditing ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={saving}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the student name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input the student age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: "Please input the student grade!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
