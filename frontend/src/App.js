import React from 'react';
import axios from 'axios'; 

//Style sheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Favourites from './components/Favourites';

//Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faTrash);

export default class App extends React.Component {

  //Contruncted starting state:
  state = {
    results: [],
    favourites: [],
    error: undefined
  };

  ////On Load function that calls the express api for the favourites array.////
  componentWillMount = () => {
     axios.get('/api/favourites')
    .then(
      (response) => {
        console.log(response.data);
        this.setState({
          favourites: response.data
        });
      },
      (error) => {
        console.log(error);
        this.setState({
            error,
            favourites: []
        });
      }
    )
  }

  ////POST new favourite to API array////
  addFavourites = (result) => { 
    axios.post("/api/favourites", {
        trackId: result.trackId,
        title: result.trackName,
        artist: result.artistName,
        kind: result.kind
        })
        .then( response => {
          const newFavourites = [...this.state.favourites];
          newFavourites.push(response.data);
          this.setState({favourites: newFavourites});
        })
        .catch(error => console.log(`${error}`));
  }

  ////DELETE favourite from API array////
  deleteFavourite = (trackId) => {
    axios.delete("/api/favourites", {params: {'track-id': trackId}})
    .then(res => {
      const filteredFavourites = this.state.favourites.filter(item =>item.trackId !== trackId);
      this.setState({favourites: filteredFavourites});
    })
    .catch(error => console.log(`Error message: ${error}`));
  }

  ////searchItunes function that will fire when user clicks search button.////
  searchItunes = async (e) => { // 'e' is the props past through from the form component when searchItunes function is called.

    e.preventDefault(); //Prevent page reload on form submit.
    const term = e.target.term.value.replace(" ", "+" ).trim().toLowerCase(); //getting the Forms input value and concatinating and trimming.
    const media = e.target.media.value;  //getting the media value
    const api_call = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&country=za&limit=50`); //Making the API call with the term/media input varibles, and setting the country to ZA and limit 12.

    if (api_call.status !== 200) { //check if api_call is not successful -> send error.
      this.setState({
        results: [],
        error: "Search failed."
      });
      return;    
    }

    const data = await api_call.json(); //parsing the json data recieved.

    if (term && media) { //if term/enity both return true/have inputs ->
      if (data.resultCount === 0) { //if nothing is returned -> send error.
        this.setState({
          results: [],
          error: "Search did not find anything."
        });

      } else { //if inputs match something in database -> setState data.results array to results.
          this.setState({
            results: data.results,
            error: ""
          });
      }
      
    } else { //if inputs were empty -> send error.
      this.setState({
        results: [],
        error: "Please enter a search."
      });
    }

  }

  render() {
    return (

        <Container fluid >
          <Row>

            <Col sm={8} md={8} lg={8} >
              <div className="SearchWrapper"> 
                <div className="SearchContent">
                  <div className="SearchHeader">
                    <h1 className="SearchHeading">Search</h1>
                    <Search searchItunes={this.searchItunes} />
                  </div>
                  <SearchResults results={this.state.results} error={this.state.error} addFavourites={this.addFavourites} favourites={this.state.favourites} />
                </div>
              </div>
            </Col>

            <Col sm={4} md={4} lg={4}>
              <div className ="FavWrapper">
                <div className="FavContent">
                  <div className="FavHeader">
                    <h1 className="FavHeading">Favourites</h1>
                  </div>
                  <Favourites favourites={this.state.favourites} deleteFavourite={this.deleteFavourite} />
                </div>
              </div>
            </Col>

          </Row>
        </Container>

    );
  }
  
}
