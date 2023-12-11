import React, { useEffect, useRef, useState } from "react";
import { apiClient, myPageApi } from "../api/ApiClient";
import { getCookie } from "../cookies/CookieFunction";
import axios, { AxiosError } from "axios";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";
import "./QuizTest.css";
import serverConfig from "../config/serverConfig";

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
  const [wrongIndexList, setWrongIndexList] = useState([]);
  const [score, setScore] = useState(0);

  const [eng, setEng] = useState(1);
  const [kor, setKor] = useState(0);
  const [progress, setProgress] = useState(0);

  const { isDone } = useAuth();
  const { memberScore } = useAuth();
  const { setIsDone } = useAuth();
  const { setMemberScore } = useAuth();

  const navigate = useNavigate();
  const baseUrl = serverConfig.serverUrl + ":8080";

  const isEnglishString = (str) => {
    const englishRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    return englishRegex.test(str);
  };

  const quizScoreInfo = async () => {
    const response = await myPageApi();
    console.log(response);
    if (response.data.done === true) {
      setIsDone(response.data.done)
      setMemberScore(response.data.quizScore);
    }
  };

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
      if (isEnglishString(response.data[0][0])) {
        setKor(1);
        setEng(0);
      } else {
        setKor(0);
        setEng(1);
      }
      setQuiz(response.data[0][kor]);
      setCorrect(response.data[0][eng]);
      setAllPoint(response.data.length);
    } catch (error) {
      console.error("details error : ", error);
    }
  };

  const onClickSubmit = () => {
    if (answer === correct) {
      setTrueFalse(true);
    } else {
      setWrongIndexList([...wrongIndexList, index]);
      setTrueFalse(false);
    }
    if (count === allPoint) {
      setEndTest(true);
      setScore(Math.round((pointCount / allPoint) * 100));
      setOnTest(false);
    } else {
      setProgress(Math.round((count / allPoint) * 100));
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
    setQuiz(quizList[index][kor]);
    setCorrect(quizList[index][eng]);
    setAnswer(null);
    setOnTest(true);
  };

  const toHomeHandler = async () => {
    if (isDone === false) {
      const response = await axios.post(
        baseUrl + "/quiz/end",
        {
          score: score,
          wrongIndexList: wrongIndexList,
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
    quizScoreInfo();
    quizInfo();
  }, []);

  const inputRefCur = useRef(null);
  useEffect(() => {
    if (inputRefCur.current) {
      inputRefCur.current.focus();
    }
  }, [inputRefCur]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickSubmit();
    }
  };

  return (
    <div className="quizTest">
      <h2 className="title-quizTest">현재 과제</h2>
      {isDone === true ? (
        <div className="quizTest-content">
          <h3>당신의 점수는 {memberScore}점 입니다</h3>
          <button onClick={toHomeHandler}>홈으로</button>
        </div>
      ) : onTest === true ? (
        <div className="quizTest-content">
          <h3>
            문제{count}: {quiz}
          </h3>
          <input
            ref={inputRefCur}
            type="text"
            value={answer}
            onChange={onChangeAnswer}
            placeholder="정답 입력"
            className="quiztest-input"
            onKeyDown={handleKeyDown}
          />
          <br />
          <button onClick={onClickSubmit} className="quiztest-submit-btn">
            제출
          </button>

          {/* <p>{correct}</p> */}
        </div>
      ) : trueFalse === true ? (
        <div className="quizTest-content">
          <h2>정답입니다</h2>
          <h3>문제 : {quiz}</h3>
          <h3>정답 : {correct}</h3>
          {endTest ? (
            <div>
              <div>총 점수는 {score} 입니다</div>
              <button className="quiztest-submit-btn" onClick={toHomeHandler}>
                홈으로
              </button>
            </div>
          ) : (
            <button className="quiztest-submit-btn" onClick={nextQuizHandler}>
              다음 문제
            </button>
          )}
        </div>
      ) : (
        <div className="quizTest-content">
          <h2>오답입니다</h2>
          <h3>문제 : {quiz}</h3>
          <h3>내 정답 : {answer}</h3>
          <h3>정답 : {correct}</h3>
          {endTest ? (
            <div>
              <div>총 점수는 {score} 입니다</div>
              <h4 className="quiz-count">남은 문제 : 0</h4>
              <button className="quiztest-submit-btn" onClick={toHomeHandler}>
                홈으로
              </button>
            </div>
          ) : (
            <div>
              <button className="quiztest-submit-btn" onClick={nextQuizHandler}>
                다음 문제
              </button>
              <h4 className="quiz-count">남은 문제 : {allPoint - count + 1}</h4>
            </div>
          )}
        </div>
      )}
      <div className="progress-text">진행도</div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default QuizTest;
