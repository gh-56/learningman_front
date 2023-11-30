import React from 'react';
import './QuizComp.css';
// 확인 버튼 onClick 시 정답 및 오답 체크 후 다음 문제로 넘어가기
function QuizComp({ vdx, kor }) {
  return (
    <div className='QuizComp'>
      <h3>문제 풀기</h3>
      <section className='question_part'>
        <h4>문제 {vdx}</h4>
        <div className='quiz_question'>{kor}</div>
      </section>
      <section className='answer_part'>
        <h4>답안 입력</h4>
        <input type='text'></input>
        <button>확인</button>
      </section>
    </div>
  );
}
export default QuizComp;
