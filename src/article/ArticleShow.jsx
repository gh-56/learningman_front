import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient, myPageApi } from "../api/ApiClient";
import { getCookie } from "../cookies/CookieFunction";

function ArticleShow({
  editState,
  setEditState,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  setEditArticleId,
  editArticleId,
}) {
  const [quizList, setQuizList] = useState([]);
  const [myInfoData, setMyInfoData] = useState(null);

  const show = async () => {
    try {
      const response = await apiClient.get("/api/articles");
      console.log("quizList : ", response.data);
      setQuizList(response.data);
    } catch (error) {
      console.error("show error : ", error);
    }
  };

  const myInfo = async () => {
    const infoResponse = await apiClient.get("/members/info", {
      headers: {
        Authorization: getCookie("tokenKey"),
      },
    });
    console.log(infoResponse.data);
    setMyInfoData(infoResponse.data);
  };

  const editArticle = (list) => {
    setEditTitle(list.title);
    setEditContent(list.content);
    setEditArticleId(list.id);
    setEditState(true);
  };

  const deleteApi = async () => {
    const response = await apiClient.post(
      "/api/deletearticles",
      {
        id: editArticleId,
      },
      {
        headers: {
          Authorization: getCookie("tokenKey"),
        },
      }
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  const deleteArticle = async (list) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const response = await apiClient
        .post(
          "/api/deletearticles",
          {
            id: list.id,
          },
          {
            headers: {
              Authorization: getCookie("tokenKey"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      alert("삭제되었습니다");
    }
  };

  useEffect(() => {
    show();
    myInfo();
  }, []);

  return (
    <div>
      <h2>문제 확인</h2>
      <table className="table">
        <thead>
          <tr>
            {/* <th>번호</th> */}
            <th>재목</th>
            <th>내용</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((list) => (
            <tr key={list.id}>
              <td>
                <Link to={`/articles/${list.id}`}>{list.title} </Link>
              </td>
              <td>{list.content}</td>
              <td>{list.member.memberName}</td>
              {list.member.memberId === myInfoData.memberId ? (
                <div>
                  <button onClick={() => editArticle(list)}>수정</button>
                  <button onClick={() => deleteArticle(list)}>삭제</button>
                </div>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleShow;
