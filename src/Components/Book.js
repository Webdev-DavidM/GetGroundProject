import React from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Book({ bookDetails }) {
  const {
    book_author,
    book_title,
    book_publication_city,
    book_publication_country,
    book_publication_year,
  } = bookDetails;

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 24,
    },
    pos: {
      marginBottom: 12,
    },
  });

  return (
    <>
      <Card className={useStyles.root}>
        <CardContent>
          <Typography
            className={useStyles.title}
            color='textSecondary'
            gutterBottom>
            Author: {book_author}
          </Typography>
          <Typography variant='h5' component='h2'>
            Title: {book_title}
          </Typography>
          <Typography variant='body2' component='p'>
            City: {book_publication_city}
          </Typography>
          <Typography variant='body2' component='p'>
            Country: {book_publication_country}
            <br />
          </Typography>
          <Typography variant='body2' component='p'>
            Year of publication: {book_publication_year}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
