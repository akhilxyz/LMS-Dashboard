import React, { useEffect, useState } from 'react';
import "./index.css";
import { AllCourses, DeleteCourse } from "../ApiBackend/ApiBackend";
import AddCourseModal from "./AddCourseModal";
import EditCourceModal from "./EditCourceModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCourse } from "../ApiBackend/ApiBackend"

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseDetails, setEditCourseDetails] = useState(null);

  const handleAddCourseClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEdit = async (_id) => {
    try {
      const courseDetails = await fetchCourseDetails(_id);
      setEditCourseId(_id);
      setEditCourseDetails(courseDetails);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
  
  const handleEditCourse = (editedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === editedCourse._id ? editedCourse : course
      )
    );
      handleCloseEditModal();
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditCourseId(null);
    setEditCourseDetails(null);
  }

  const handleDelete = async (_id) => {
    try {
      toast.info(
        <div>
          <p>Are you sure you want to delete this course?</p>
          <button className="toast_btn" onClick={() => handleConfirmDelete(_id)}>Yes</button>
          <button className='toast_btn' onClick={handleCancelDelete}>No</button>
        </div>,
        { autoClose: false }
      );
    } catch (error) {
      console.error('Error initiating delete:', error);
    }
  };

  const handleConfirmDelete = async (_id) => {
    try {
      toast.dismiss();
      const deletedCourse = await DeleteCourse(_id);
      console.log(deletedCourse, "deletedCourse>>>>>>>>>>>>>>");
  
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
  
      toast.success("Course Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCancelDelete = () => {
    toast.dismiss();
  };

  const handleAddCourse = async () => {
    try {
      const response = await AllCourses();
      console.log(response);
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AllCourses();
        console.log(response);
        setCourses(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchData();
  }, []);

  const fetchCourseDetails = async (_id) => {
    try {
      const response = await getCourse(_id);
      console.log(response, ">>>>>>>>>>>>>>>");
      return response;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  };

  return (
    <>
      <div className='courses_top'>
        <h2>My Courses</h2>
        <button onClick={handleAddCourseClick}>Add courses</button>
      </div>

      <table className="courses-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>{course?.title}</td>
              <td>{course?.description}</td>
              <td>
                <div className="operations-cell">
                  <button className="edit-btn" onClick={() => handleEdit(course?._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(course?._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <EditCourceModal isOpen={showEditModal}onClose={handleCloseEditModal}courseId={editCourseId}courseDetails={editCourseDetails}  onEditCourse={handleEditCourse} />
      <AddCourseModal isOpen={showModal} onClose={handleCloseModal} onAddCourse={handleAddCourse} />
      <ToastContainer/>
    </>
  );
}

export default MyCourses;
