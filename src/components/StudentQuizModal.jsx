import React from "react";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "../cookies/CookieFunction";
import axios, { AxiosError } from "axios";
import "./StudentQuizModal.css";

function StudentQuizModal({ setModalOpen, wrongIndexList, modalOpen }) {
  const baseUrl = "http://localhost:8080";
  const [wrongQuizList, setWrongQuizList] = useState(null);

  const quizInfo = async () => {
    try {
      const response = await axios.post(
        baseUrl + "/teacher/wrongquiz",
        {
          wrongIndexList: wrongIndexList,
        },
        {
          headers: {
            Authorization: getCookie("tokenKey"),
          },
        }
      );
      console.log("/quiz/test에서 받은 데이터: ", response.data);
      setWrongQuizList(
        response.data.map((value) => (
          <div>
            <div>{value[0]}</div>
            <div>{value[1]}</div>
          </div>
        ))
      );
    } catch (error) {
      console.error("details error : ", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    quizInfo();
  }, []);

  return (
    <div>
      <div className="container">
        {wrongIndexList === null ? (
          <div>아직 과제를 하지 않았습니다</div>
        ) : (
          <div>{wrongQuizList}</div>
        )}
        <button className="close" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
}

export default StudentQuizModal;
