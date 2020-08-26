import React from 'react';

//Style Sheets
import Table from 'react-bootstrap/Table';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Favourites({favourites, deleteFavourite}) {

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

    return (
        <div>
            <Table responsive hover variant="dark" size="md">
                <thead className="TableHead">
                    <tr>
                        <th colSpan="2">Title</th>
                        <th>Artist</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {favourites.map(favourite => ( //map through the favourites array -> input favourites into table element.
                        <tr key={favourite.trackId}>
                            <td colSpan="2">{favourite.title}</td>
                            <td>{favourite.artist}</td>
                            <td>{formatKind(favourite.kind)}</td>
                            <td><FontAwesomeIcon icon={['fas', 'trash']} className="TrashBtn" onClick={() => deleteFavourite(favourite.trackId)}/></td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}
