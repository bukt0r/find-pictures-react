import React from "react"
import Header from "./Header"
import axios from "axios"


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: "",
        currentPage: 1,
        maxPages: 1,
        images: [],
      };
    }
  
    buttonSearch = () => {
      this.setState({ currentPage: 1, images: [] }, () => {
        this.searchImages(this.state.query, this.state.currentPage);
      });
    };
  
    buttonPrevPage = () => {
      if (this.state.currentPage > 1) {
        this.setState({ currentPage: this.state.currentPage - 1 }, () => {
          this.searchImages(this.state.query, this.state.currentPage);
        });
      }
    };
  
    buttonNextPage = () => {
      if (this.state.currentPage < this.state.maxPages) {
        this.setState({ currentPage: this.state.currentPage + 1 }, () => {
          this.searchImages(this.state.query, this.state.currentPage);
        });
      }
    };
  
    searchImages = async (query, page) => {
      const apiKey = "16b2c0273e35ae2b8d6110cd7ac4a62c";
      const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&page=${page}&per_page=20&format=json&nojsoncallback=1`;
  
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const photos = data.photos.photo;
        this.setState({ maxPages: data.photos.pages, images: photos });
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };
  
    render() {
      return (
        <div className="mainDiv">
          <Header title="Find Pictures" />
  
          <input
            placeholder="Введите Ваш запрос"
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
          />
  
          <button onClick={this.buttonSearch}>Поиск</button>
  
          <div>
            <button onClick={this.buttonPrevPage}>Предыдущая страница</button>
            <span>Стр. {this.state.currentPage}</span>
            <button onClick={this.buttonNextPage}>Следующая страница</button>
          </div>
  
            <div id="result-search" className="image-container">
                {this.state.images.map((photo) => (
                    <div key={photo.id} className="image-card">
                        <img
                            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                            alt={photo.title}
                        />
                    </div>
                ))}
            </div>
        </div>
      );
    }
  }
  
  export default App;