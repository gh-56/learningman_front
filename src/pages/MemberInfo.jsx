import { memberData } from '../App';
import React, { useEffect, useState, useContext } from 'react';

function MemberInfo() {
    const { memberName, memberEmail, memberPassword, memberRole } = useContext(memberData);
  return (
    <div>
      <h1>{memberName}</h1>
      <h1>{memberEmail}</h1>
      <h1>{memberPassword}</h1>
      <h1>{memberRole}</h1>
    </div>
  )
}

export default MemberInfo
