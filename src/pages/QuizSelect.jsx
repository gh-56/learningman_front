import { async } from 'q';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useContext, useState } from 'react';

// Teacher Only

function QuizSelect() {
  const baseUrl = 'http://localhost:8080';
  const [bookData, setBookData] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [chapterData, setChapterData] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const onChangeHandlerBook = (e) => {
    setSelectedBook(e.target.value);
  };
  const onChangeHandlerChapter = (e) => {
    setSelectedChapter(e.target.value);
  };

  const bookInfo = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.get(baseUrl + '/book');
      console.log(response.data);
      setBookData(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };
  useEffect(() => {
    bookInfo();
  }, []);
  console.log('bookData : ' + bookData);

  const newBookArray = Array.from(bookData);
  console.log(newBookArray);
  console.log('selectedBook : ' + selectedBook);
  return (
    <div>
      숙제 설정하기
      <div>
        <label htmlFor='selectBook'>교재 선택:</label>
        <select
          id='selectBook'
          value={selectedBook}
          onChange={onChangeHandlerBook}
        >
          {newBookArray.map((book, idx) => (
            <option key={idx} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='selectChapter'>단원 선택:</label>
        <select
          id='selectChapter'
          value={selectedChapter}
          onChange={onChangeHandlerChapter}
        >
          {newBookArray.map((book, idx) => (
            <option key={idx} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default QuizSelect;
