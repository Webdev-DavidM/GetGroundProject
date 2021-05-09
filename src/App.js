import './App.css';
import '@fontsource/roboto';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestBooks, search, displayPage } from './Actions/books';

import NavBar from './Components/NavBar';
import Books from './Components/Books';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {
  search = (e) => {
    this.props.searchBooks(e.target.value);
  };

  //

  paginate = (event, value) => {
    this.props.changePage(value);
  };

  componentDidMount = () => {
    if (!window.location.search) {
      this.props.getBooks();
    } else {
      if (window.location.search.includes('page')) {
        this.props.changePage(
          parseInt(
            window.location.search.substr(6, window.location.search.length - 1)
          )
        );
      } else {
        this.props.searchBooks(
          window.location.search.substr(8, window.location.search.length - 1)
        );
      }
    }
  };

  render() {
    // I will have the search and pagination directly on this page and then this is the only class based component, books then just needs to
    // to know what to render from the search or pagination
    console.log(this.props.totalBooks);
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
          count={(this.props.totalBooks / 6).toFixed()}
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
    getBooks: () => dispatch(requestBooks()),
    searchBooks: (searchData) => dispatch(search(searchData)),
    changePage: (page) => dispatch(displayPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
