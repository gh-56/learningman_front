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

  // 책 리스트 불러오기
  const bookInfo = async () => {
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

  // 책 선택 시 챕터 리스트 불러오기
  useEffect(() => {
    if (selectedBook) {
      chapterInfo(selectedBook);
    }
  });
  const chapterInfo = async () => {
    try {
      await axios
        .post(baseUrl + '/book/chapter', {
          selectedBook: selectedBook,
        })
        .then((chapterResponse) => {
          console.log(chapterResponse.data);
          setChapterData(chapterResponse.data);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('bookData : ' + bookData);

  const newChapterArray = Array.from(chapterData);
  console.log('newChapterArray : ' + newChapterArray);
  console.log('selectedChapter : ' + selectedChapter);

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
          {newBookArray.map((book, bidx) => (
            <option key={bidx} value={book}>
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
          {newChapterArray.map((chapter, cidx) => (
            <option key={cidx} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default QuizSelect;
