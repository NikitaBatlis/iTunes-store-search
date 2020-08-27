import React from 'react';

//Style sheets
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchResults({results, addFavourites, favourites, deleteFavourite}) {

    
    function formatKind(kind) { //Function to format the media type string thats returned.
        if (kind == null || kind === '') {
            return '';
        }
        const splitArray = kind.split('-');
        let result = '';
        splitArray.forEach((item, index) => {
            result += item[0].toUpperCase() + item.substring(1);
            if (index !== splitArray.length - 1) {
                result += ' ';
            }
        });
        return result;
    }

    function isFavourite(trackId) { //Function to change the style of the faHeart on click.
        if (favourites.some(fav => fav.trackId === trackId)) {
            return '#fa2068';
        } else {
            return 'white';
        }
        
    }

    function handleOnClick(result) {
        if (favourites.some(fav => fav.trackId === result.trackId)) {
            deleteFavourite(result.trackId);
        } else {
            addFavourites(result);
        }
    }

    return (
        <Container fluid>

            <Row xs={1} md={2} lg={3}>

                {results.map(result => ( //map through the result array -> input results into Col element.

                    <Col key={result.trackId} className="ResultContainer">
                        <img className="ResultImg" src={result.artworkUrl100} alt="result_artwork" />
                        <div className="ResultDetails">
                            <p className="ResultsTitle">{result.trackName}</p>                
                            <p className="ResultsArtist">{result.artistName}</p>
                            <p className="ResultsMedia">{formatKind(result.kind)}</p>
                        </div>
                        <div className="ResultBtn">                              
                            <FontAwesomeIcon icon={['fas', 'heart']} size="lg" className="HeartBtn" onClick={() => handleOnClick(result)} style={{color: isFavourite(result.trackId)}}/>
                        </div>
                    </Col>
                ))}

            </Row>
        </Container>
    )
}
