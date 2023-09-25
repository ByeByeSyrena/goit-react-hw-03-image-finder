import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImgs } from './Api/api';
import { Audio } from 'react-loader-spinner';
import Button from './Button/Button';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

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
    selectedImage: null,
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

  handleSubmit = searchQuery => {
    this.setState({
      searchItem: searchQuery,
      page: 1,
      images: [],
      allImagesLoaded: false,
      selectedImage: null,
    });
  };

  async loadImages(searchItem, perPage, page) {
    this.setState({ isLoading: true, showModale: false });
    try {
      const images = await fetchImgs(searchItem, perPage, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
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

  toggleModale = event => {
    this.setState(prevState => ({
      showModale: !prevState.showModale,
    }));
  };

  showSelectedImage = event => {
    const selectedImage = event.target.value;
    this.setState({ selectedImage: selectedImage });
    this.toggleModale();
  };

  render() {
    const {
      images,
      isLoading,
      error,
      perPage,
      allImagesLoaded,
      showModale,
      selectedImage,
    } = this.state;
    const loadMoreButton =
      !allImagesLoaded && images.length > 0 && images.length % perPage === 0;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.showSelectedImage} />
        )}
        {isLoading && (
          <Audio
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%' }}
          />
        )}
        {loadMoreButton && (
          <Button
            text="Load more"
            clickHandle={this.showMoreImages}
            condition={allImagesLoaded}
          />
        )}
        {showModale && (
          <Modal>
            {selectedImage && (
              <img src={selectedImage.largeImageURL} alt="image" />
            )}
          </Modal>
        )}
      </AppContainer>
    );
  }
}
