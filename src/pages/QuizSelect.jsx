import { async } from 'q';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import './QuizSelect.css';

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
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });
    try {
      const response = await axios.get(baseUrl + '/book');
      console.log('/book에서 받은 데이터: ', response.data);
      setBookData(response.data);
      setSelectedBook(response.data[0]);
    } catch (error) {
      console.error('details error : ', error);
    }
  };
  useEffect(() => {
    bookInfo();
  }, []);
  console.log('bookData : ' + bookData);

  const newBookArray = Array.from(bookData);
  console.log('newBookArray: ', newBookArray);

  console.log('selectedBook : ' + selectedBook);

  // 책 선택 시 챕터 리스트 불러오기
  useEffect(() => {
    const chapterInfo = async () => {
      try {
        await axios
          .post(
            baseUrl + '/book/chapter',
            {
              selectedBook: selectedBook,
            },
            {
              headers: {
                Authorization: getCookie('tokenKey'),
              },
            }
          )
          .then((chapterResponse) => {
            console.log('/book/chapter에서 온 데이터: ', chapterResponse.data);
            setChapterData(chapterResponse.data);
            setSelectedChapter(chapterResponse.data[0]);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    chapterInfo();
  }, [selectedBook]);
  console.log('bookData : ' + bookData);

  const newChapterArray = Array.from(chapterData);
  console.log('chapterData : ', chapterData);
  console.log('newChapterArray : ', newChapterArray);
  console.log('selectedChapter : ', selectedChapter);

  // homework 테이블에 선택된 단어장과 챕터 저장
  const onClickSelect = (e) => {};

  const [selectedDeadline, setSelectedDeadline] = useState('nextDay');
  const calculateDate = () => {
    const currentDate = new Date();
    switch (selectedDeadline) {
      case 'nextDay':
        return new Date(currentDate.setDate(currentDate.getDate() + 1));
      case 'nextWeek':
        return new Date(currentDate.setDate(currentDate.getDate() + 7));
      case 'nextMonth':
        return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      default:
        return currentDate;
    }
  };
  const handleRadioChange = (e) => {
    setSelectedDeadline(e.target.value);
  };
  return (
    <div className='quiz-container'>
      <div className='quiz-item'>
        <div className='quiz-select'>
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
        <div className='quiz-select'>
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
        <button onClick={onClickSelect} className='quiz-select-button'>
          선택
        </button>
      </div>
      <div className='quiz-item'>
        <div>
          <input
            type='radio'
            value='nextDay'
            checked={selectedDeadline === 'nextDay'}
            onChange={handleRadioChange}
            className='select-date-radio'
          />
          다음 날
        </div>
        <div>
          <input
            type='radio'
            value='nextWeek'
            checked={selectedDeadline === 'nextWeek'}
            onChange={handleRadioChange}
            className='select-date-radio'
          />
          다음 주
        </div>
        <div>
          <input
            type='radio'
            value='nextMonth'
            checked={selectedDeadline === 'nextMonth'}
            onChange={handleRadioChange}
            className='select-date-radio'
          />
          다음 달
        </div>
        <p className='selected-date'>
          선택한 기간: <strong>{calculateDate().toLocaleDateString()}</strong>
        </p>
      </div>
    </div>
  );
}

export default QuizSelect;
