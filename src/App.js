import './App.css';
import '@fontsource/roboto';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestBooks } from './Actions/books';

import NavBar from './Components/NavBar';
import Books from './Components/Books';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {
  search = (e) => {
    this.props.getBooks({ page: 1, search: e.target.value });
  };

  paginate = (event, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('search') !== null) {
      this.props.getBooks({
        page: value,
        search: searchParams.get('search'),
      });
    } else {
      this.props.getBooks({ page: value, search: '' });
    }
  };

  componentDidMount = () => {
    if (!window.location.search) {
      this.props.getBooks({ page: 1, search: '' });
    } else {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('search') === null) {
        this.props.getBooks({
          page: searchParams.get('page'),
          search: '',
        });
      } else {
        this.props.getBooks({
          page: searchParams.get('page'),
          search: searchParams.get('search'),
        });
      }
    }
  };

  render() {
    return (
      <>
        {this.props.loading && (
          <div className='loader'>
            <CircularProgress color='secondary' size='6rem' />
          </div>
        )}
        <NavBar />
        <TextField
          fullWidth={true}
          placeholder={'Please search here'}
          onChange={(e) => this.search(e)}
          style={{ marginBottom: '1rem' }}
          value={this.props.searchValue}
        />
        <Pagination
          className='pagination'
          count={parseInt((this.props.totalBooks / 6).toFixed())}
          page={this.props.currPage}
          onChange={(event, value) => this.paginate(event, value)}
        />
        <Books books={this.props.books} />
        {this.props.error && <p>{this.props.error}</p>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    books: state.booksToDisplay,
    totalBooks: state.totalBooks,
    currPage: state.currentPage,
    searchValue: state.searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (data) => dispatch(requestBooks(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
