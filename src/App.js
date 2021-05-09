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

  //

  paginate = (event, value) => {
    this.props.getBooks({ page: value, search: '' });
  };

  componentDidMount = () => {
    if (!window.location.search) {
      this.props.getBooks({ page: 1, search: '' });
    } else {
      if (window.location.search.includes('page')) {
        this.props.getBooks({
          page: parseInt(
            window.location.search.substr(6, window.location.search.length - 1)
          ),
          search: '',
        });
      } else {
        this.props.getBooks({
          page: 1,
          search: window.location.search.substr(
            8,
            window.location.search.length - 1
          ),
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (data) => dispatch(requestBooks(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
