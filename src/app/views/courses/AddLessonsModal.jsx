import React from 'react';
import { Modal, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddLesson } from "../ApiBackend/ApiBackend";
import "./AddCourseModal.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


// const MAX_LESSONS = 44;

const AddLessonModal = ({ isOpen, onClose, onAddLesson, courseId }) => {
    const [lessonDetailsSaved, setLessonDetailsSaved] = useState(false);


    const token = useSelector((state) => state.authToken);
    const formik = useFormik({
        initialValues: {
            lessons: [{ title: '', content: '', videoUrl: '' }],
            course: courseId,
        },
        validationSchema: Yup.object({
            lessons: Yup.array().of(
                Yup.object().shape({
                    title: Yup.string().required('Title is required'),
                    content: Yup.string().required('Content is required'),
                    videoUrl: Yup.string(),
                })
            ),
        }),


        onSubmit: async (values) => {
            console.log("test 1", values);
            try {
                const res = await AddLesson(token, values);
                console.log(res, "AddLesson");
                if (res.status === true) {
                    console.log("LEsson added successfully");
                    toast.success("LEsson Added Successfully", {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored"
                    })
                    // onClose(true);
                    onAddLesson();
                    setLessonDetailsSaved(true);
                    onClose();


                }
            } catch (error) {
                console.error("Error adding lesson", error);
            }

        },
    });

    const handleCloseModal = () => {
        onClose()
    }
    useEffect(() => {
        if (isOpen) {
            formik.resetForm();
            setLessonDetailsSaved(false);
        }
    }, [isOpen]);



    useEffect(() => {
        if (lessonDetailsSaved && isOpen) {
            onClose();
            setLessonDetailsSaved(false);

        }
    }, [lessonDetailsSaved, isOpen, onClose]);

    const addLessonField = () => {
        const newLessons = [...formik.values.lessons, { title: '', content: '', videoUrl: '' }];
        formik.setFieldValue('lessons', newLessons);
    };


    return (
        <>
            <Modal show={isOpen} onHide={handleCloseModal} centered>
                <Modal.Header>
                    <Modal.Title> Add Lesson</Modal.Title>
                    <IoCloseSharp onClick={onClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={formik.handleSubmit} className='row'>
                        <div className='lesson-form-container' style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {formik.values.lessons.map((lesson, index) => (
                                <div key={index} >
                                    <FormGroup className='mb-3 col-md-6'>
                                        <FormLabel htmlFor={`title-${index}`}>Title</FormLabel>
                                        <FormControl
                                            type='text'
                                            id={`title-${index}`}
                                            name={`lessons[${index}].title`}
                                            value={lesson.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.lessons && formik.touched.lessons[index] && formik.errors.lessons && formik.errors.lessons[index]?.title}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.lessons && formik.errors.lessons[index]?.title}
                                        </Form.Control.Feedback>
                                    </FormGroup>


                                    <FormGroup className='mb-3 col-md-6'>
                                        <FormLabel htmlFor={`videoUrl-${index}`}>video Url</FormLabel>
                                        <FormControl
                                            type='text'
                                            id={`videoUrl-${index}`}
                                            name={`lessons[${index}].videoUrl`}
                                            value={lesson.videoUrl}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.lessons && formik.touched.lessons[index] && formik.errors.lessons && formik.errors.lessons[index]?.videoUrl}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.lessons && formik.errors.lessons[index]?.videoUrl}
                                        </Form.Control.Feedback>
                                    </FormGroup>


                                    <FormGroup className=''>
                                        <FormLabel htmlFor={`content-${index}`}>Content</FormLabel>
                                        <FormControl
                                            style={{
                                                width: '100%',
                                            height:'80px'}}
                                            type='text'
                                            id={`content-${index}`}
                                            name={`lessons[${index}].content`}
                                            value={lesson.content}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.lessons && formik.touched.lessons[index] && formik.errors.lessons && formik.errors.lessons[index]?.content}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.lessons && formik.errors.lessons[index]?.content}
                                        </Form.Control.Feedback>
                                    </FormGroup>

                                   
                                    <hr />
                                </div>
                            ))}
                        </div>
            
                        <Button type='button'  className="addLesson" style={{
                            width: "auto",
                            justifycontent: "center",
                            display: "flex",
                            marginleft: "220px",
                            borderRadius: "20px",
                        }} onClick={addLessonField}>
                            +
                        </Button>
                        <Modal.Footer>
                            <Button className='submitt_course'  type='submit'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal >
            <ToastContainer />
        </>
    );
};




export default AddLessonModal;
