import { memberData } from '../App';

function MemberInfo() {
  const members = window.localStorage.getItem("members")
  const membersInfo = JSON.parse(members);
  return (
    <div>
      <h1>{membersInfo.memberName}</h1>
      <h1>{membersInfo.memberEmail}</h1>
      <h1>{membersInfo.memberPassword}</h1>
      <h1>{membersInfo.memberRole}</h1>
      <h1>test</h1>
    </div>
  )
}

export default MemberInfo
