import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    showModale: false,
    isLoading: false,
    searchItem: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchItem: searchQuery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Modal />
      </>
    );
  }
}
