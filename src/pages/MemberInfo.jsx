import { useEffect, useState } from "react"
import { myPageApi } from "../api/ApiClient";

function MemberInfo() {
  const [memberDto, setMemberDto] = useState(null);

  const callApi = async () =>{
    const response = await myPageApi();
    console.log(response);

    setMemberDto(response.data);
  };

  useEffect(()=>{
    callApi();
  }, []);

  return (
    <div>
      {memberDto && (
        <div>
          <h2>회원정보</h2>
          <div>이메일 : {memberDto.memberEmail}</div>
          <div>이름 : {memberDto.memberName}</div>
        </div>
      )}
    </div>
  )
}

export default MemberInfo
