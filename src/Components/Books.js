import React from 'react';
import Book from './Book';

export default function Books(props) {
  return (
    <>
      {props &&
        props.books.map((book, index) => (
          <Book bookDetails={book} key={index} />
        ))}
    </>
  );
}
