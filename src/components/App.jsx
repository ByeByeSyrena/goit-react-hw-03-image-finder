import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImgs } from './Api/api';
import { Audio } from 'react-loader-spinner';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    showModale: false,
    isLoading: false,
    searchItem: '',
    error: null,
    perPage: 12,
    page: 1,
    allImagesLoaded: false,
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchItem: searchQuery,
      page: 1,
      images: [],
      allImagesLoaded: false,
    });
  };

  async componentDidMount() {
    const { searchItem, perPage, page } = this.state;
    if (searchItem) {
      this.loadImages(searchItem, perPage, page);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchItem, perPage, page } = this.state;
    if (
      searchItem !== prevState.searchItem ||
      perPage !== prevState.perPage ||
      page !== prevState.page
    ) {
      this.loadImages(searchItem, perPage, page);
    }
  }

  async loadImages(searchItem, perPage, page) {
    this.setState({ isLoading: true });
    try {
      const images = await fetchImgs(searchItem, perPage, page);
      this.setState(prevState => ({
        images:
          prevState.images.length <= images.totalHits
            ? [...prevState.images, ...images.hits]
            : prevState.images,
        allImagesLoaded: images.totalHits <= prevState.images.length,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showMoreImages = () => {
    if (!this.state.allImagesLoaded) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
  };

  render() {
    const { images, isLoading, error, perPage, allImagesLoaded } = this.state;
    const loadMoreButton =
      !allImagesLoaded && images.length > 0 && images.length % perPage === 0;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading ? (
          <Audio
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%' }}
          />
        ) : (
          images.length > 0 && <ImageGallery images={images} />
        )}
        {loadMoreButton && (
          <Button
            text="Load more"
            clickHandle={this.showMoreImages}
            condition={allImagesLoaded}
          />
        )}
        <Modal />
      </>
    );
  }
}
