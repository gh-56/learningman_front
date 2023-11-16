import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function Home() {
  const [message, setMessage] = useState(null);
  const [arr, setArr] = useState([]);

  const callApi = () => {
    const url = 'http://localhost:8080/hello';
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setMessage(text);
      })
      .catch((e) => console.error(e));
  };

  // axios 사용
  const callApiAxios = () => {
    const url = 'http://localhost:8080/hello';
    axios.get(url).then((response) => setMessage(response.data));
  };

  const callApi2 = () => {
    const url = 'http://localhost:8080/hello2';
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setMessage(text);
      })
      .catch((e) => console.error(e));
  };

  const callApi3 = () => {
    const url = 'http://localhost:8080/hello3';
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setMessage(text);
      })
      .catch((e) => console.error(e));
  };

  const callApi3Arr = () => {
    const url = 'http://localhost:8080/hello3';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setArr(json);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <button onClick={callApi}>문자열</button>

      <button onClick={callApiAxios}>문자열 Axios</button>

      <button onClick={callApi2}>응답객체+문자열</button>

      <button onClick={callApi3}>응답객체+JSON+텍스트</button>

      <button onClick={callApi3Arr}>응답객체+JSON+JSX 반복으로 풀어보기</button>
      <h1>{message}</h1>
      <h2>{arr.size}</h2>
      {arr.map((item, index) => (
        <li key={index}>{item.key}</li>
      ))}
    </div>
  );
}

export default Home;
