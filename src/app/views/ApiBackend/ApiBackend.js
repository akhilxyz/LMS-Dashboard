import axios from "axios";
import { Base_url } from "./BaseUrl";

export const LoginApi = async (values) => {
  try {
    console.log("OKOKOK", values);
    const response = await axios.post(`${Base_url}/user/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const AllCourses = async (token,values) => {
  try {
    const response = await axios.get(`${Base_url}/user/allCourses`, values, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetAllDetails = async (token,values) => {
  try {
    const response = await axios.get(`${Base_url}/user/payment/getAllDetails`, values, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const AddCource = async (token,values) => {
  const {
    title,
    description,
    instructor,
    imageUrl,
    duration,
    language,
    level,
    price,
    requirements,
    subject,
  } = values;
  try {
    const resp = await fetch(`${Base_url}/user/addCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
      body: JSON.stringify({
        title,
        description,
        instructor,
        imageUrl,
        duration,
        language,
        level,
        price,
        requirements,
        subject,
      }),
    });
    const data = await resp.json();
    console.log("AddCourse is added successfully:", data);
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteCourse = async (token,_id) => {
  console.log("iam inn");
  try {
    const response = await axios.delete(
      `${Base_url}/user/deleteCourse/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const DeleteLesson = async (token, _id) => {
  console.log("iam inn deleyeimbg lessons");
  try {
    const response = await axios.delete(
      `${Base_url}/user/deleteLesson/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const getCourse = async (token,_id) => {
  console.log("iam inn");
  try {
    const response = await axios.get(`${Base_url}/user/getCourse/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const EditCource = async (token,{ _id, values }) => {
  console.log(values, "reqqqqqqq");
  console.log("iam inn");
  try {
    const response = await axios.post(
      `${Base_url}/user/updateCourse/${_id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
         
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const EditLesson = async (token, { _id, values }) => {
  console.log(values, "reqqqqqqq");
  console.log("iam inn Lessons");
  const { title, content, videoUrl } = values;
  // console.log("Tokem  ",token)
  try {
    const response = await axios.post(`${Base_url}/user/updateLesson/${_id}`,JSON.stringify({ title, content, videoUrl }), {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
      
    });
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};


export const GetPaymentHistory = async (
  token,
  item = 10,
  page = 1,
  searchQuery = "",
  signal
) => {
  try {
    const response = await axios.get(
      `${Base_url}/user/payment/getDetails/?page=${page}&itemsPerPage=${item}&search=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
        cancelToken: signal ? signal.token : undefined,
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const GetPaymentHistoryById = async (token,userId) => {
  try {
    const response = await axios.get(
      `${Base_url}/user/getUserbyID/${userId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetCoursesById = async (token,courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/user/getCourse/${courseId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetLessonsById = async (token,courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/user/allcourses/${courseId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
// export const AddLesson = async (token,courseId,values) => {
 
//   const obj = [
//     {
//       title,
//       content,
//       videoUrl,
//     },
//   ];

//   console.log("values", obj);
//   try {
//     const resp = await fetch(`${Base_url}/user/addMultipleLesson`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-authorization": token,
//       },
//       body: JSON.stringify({
       
//         obj,
//         course: "657ff9b6d80be2372caff21d",
//       }),
//     });
//     const data = await resp.json();
//     console.log("AddCourse is added successfully:", data);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

export const AddLesson = async (token, values) => {
  const { lessons,course } = values;
  

  try {
    const resp = await fetch(`${Base_url}/user/addMultipleLesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
      body: JSON.stringify({
        lessons,
        course,
      }),
    });

    const data = await resp.json();
    console.log("AddLesson is added successfully:", data);
    return data;
  } catch (error) {
    return error;
  }
};


export const GetReferralLink = async (
  token,
  item = 10,
  page = 1,
  searchQuery =''
) => {
  try {
    // console.log("Token ", localStorage.getItem("token"))
    const response = await axios.get(
      `${Base_url}/user/pendingRequests/?page=${page}&itemsPerPage=${item}&search=${searchQuery}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const handleRequest = async (requestId, status, token, remarks) => {
  // const status = status;
  console.log("ssss", status);
  try {
    const response = await axios.post(
      `${Base_url}/user/affiliationRequestAction/${requestId}`,

      {
        status: status,
        remarks: "remarks",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
