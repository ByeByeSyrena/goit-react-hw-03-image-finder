import css from './Searchbar.module.css';
import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchQuery } = this.state;
    this.props.onSubmit(searchQuery);
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className="searchbar">
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={searchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
