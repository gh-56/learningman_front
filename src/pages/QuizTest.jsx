import React, { useEffect, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { getCookie } from "../cookies/CookieFunction";
import axios, { AxiosError } from "axios";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

function QuizTest() {
  const [quizList, setQuizList] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [trueFalse, setTrueFalse] = useState(null);
  const [onTest, setOnTest] = useState(true);
  const [index, setIndex] = useState(0);
  const [pointCount, setPointCount] = useState(0);
  const [count, setCount] = useState(1);
  const [allPoint, setAllPoint] = useState(0);
  const [endTest, setEndTest] = useState(false);
  const [score, setScore] = useState(0);
  const { isDone } = useAuth();
  const { memberScore } = useAuth();
  const {setIsDone} = useAuth();
  const {setMemberScore} = useAuth();

  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080";

  const quizInfo = async () => {
    console.log(isDone);
    console.log(memberScore);
    try {
      const response = await axios.get(baseUrl + "/quiz/test", {
        headers: {
          Authorization: getCookie("tokenKey"),
        },
      });
      console.log("/quiz/test에서 받은 데이터: ", response.data);
      setQuizList(response.data);
      setQuiz(response.data[0][0]);
      setCorrect(response.data[0][1]);
      setAllPoint(response.data.length);
    } catch (error) {
      console.error("details error : ", error);
    }
  };

  const onClickSubmit = () => {
    if (answer === correct) {
      setTrueFalse(true);
    } else {
      setTrueFalse(false);
    }
    if (count === allPoint) {
      setEndTest(true);
      setScore(Math.round((pointCount / allPoint) * 100));
      setOnTest(false);
    } else {
      setCount(count + 1);
      setIndex(index + 1);
      setOnTest(false);
    }
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const nextQuizHandler = () => {
    if (trueFalse) {
      setPointCount(pointCount + 1);
    }
    setQuiz(quizList[index][0]);
    setCorrect(quizList[index][1]);
    setAnswer(null);
    setOnTest(true);
  };

  const toHomeHandler = async () => {
    if (isDone === false) {
      const response = await axios.post(
        baseUrl + "/quiz/end",
        {
          score: score,
        },
        {
          headers: {
            Authorization: getCookie("tokenKey"),
          },
        }
      );
      setIsDone(true);
      setMemberScore(score);
      console.log(response);
    }
    navigate("/");
  };

  useEffect(() => {
    quizInfo();
  }, []);

  return (
    <div>
      <h1>이번주 과제</h1>
      {isDone === true ? (
        <div>
          <h3>당신의 점수는 {memberScore}점 입니다</h3>
          <button onClick={toHomeHandler}>홈으로</button>
        </div>
      ) : onTest === true ? (
        <div>
          <h3>{quiz}</h3>
          <input
            type="text"
            value={answer}
            onChange={onChangeAnswer}
            placeholder="정답 입력"
          />
          <h4>
            {count}/{allPoint}
          </h4>
          <button onClick={onClickSubmit}>정답</button>
          <p>{correct}</p>
        </div>
      ) : trueFalse === true ? (
        <div>
          <h2>정답입니다</h2>
          <h3>문제 : {quiz}</h3>
          <h3>정답 : {correct}</h3>
          {endTest ? (
            <div>
              <div>총 점수는 {score} 입니다</div>
              <button onClick={toHomeHandler}>홈으로</button>
            </div>
          ) : (
            <button onClick={nextQuizHandler}>다음 문제</button>
          )}
        </div>
      ) : (
        <div>
          <h2>오답입니다</h2>
          <h3>문제 : {quiz}</h3>
          <h3>내 정답 : {answer}</h3>
          <h3>정답 : {correct}</h3>
          {endTest ? (
            <div>
              <div>총 점수는 {score} 입니다</div>
              <button onClick={toHomeHandler}>홈으로</button>
            </div>
          ) : (
            <button onClick={nextQuizHandler}>다음 문제</button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizTest;
