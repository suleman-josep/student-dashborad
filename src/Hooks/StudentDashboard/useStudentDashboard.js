// useStudentDashboard.js
import { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Papa from "papaparse";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const useStudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students: ", error);
        message.error("Error fetching students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      if (isEditing) {
        await updateDoc(doc(db, "students", editingStudent.id), values);
        message.success("Student updated successfully");
      } else {
        await addDoc(collection(db, "students"), values);
        message.success("Student added successfully");
      }
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
      handleCancel();
    } catch (error) {
      console.error("Error adding/updating student: ", error);
      message.error("Error adding/updating student");
    } finally {
      setSaving(false);
    }
  };

  const editStudent = (record) => {
    setIsEditing(true);
    setEditingStudent(record);
    form.setFieldsValue(record);
    showModal();
  };

  const deleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      message.success("Student deleted successfully");
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student: ", error);
      message.error("Error deleting student");
    }
  };

  const handleUpload = async ({ file }) => {
    setLoading(true);
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const studentsData = results.data;
          const promises = studentsData.map((student) =>
            addDoc(collection(db, "students"), student)
          );
          await Promise.all(promises);
          message.success("CSV data uploaded successfully");
          const querySnapshot = await getDocs(collection(db, "students"));
          const studentsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStudents(studentsList);
        } catch (error) {
          console.error("Error uploading CSV data: ", error);
          message.error("Error uploading CSV data");
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file: ", error);
        message.error("Error parsing CSV file");
        setLoading(false);
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => editStudent(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteStudent(record.id)}
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return {
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
  };
};
export default useStudentDashboard;
//
