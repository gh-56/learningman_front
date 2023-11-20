import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const baseUrl = "http://localhost:8080";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(baseUrl + "/members/login", {
        memberEmail: email,
        memberPassword: password,
      })
      .then((userDetails) => {
        if (userDetails.data == null) {
          alert("정보가 일치하지 않습니다");
          window.location.reload();
        } else {
          var member = {
            memberName: userDetails.data.username,
            memberEmail: userDetails.data.password,
            memberPassword: email,
            memberRole: userDetails.data.authorities[0].authority,
          };
          localStorage.setItem('members', JSON.stringify(member));
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={formSubmit} method="GET">
        <input
          name="email"
          type="text"
          value={email}
          onChange={onChangeHandlerEmail}
        />
        <input
          name="password"
          type="text"
          value={password}
          onChange={onChangeHandlerPassword}
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default Login;
