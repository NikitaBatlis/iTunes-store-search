import React from 'react';

export default function Search(props) {
    return (

        <div className="SearchForm">
            <form onSubmit={props.searchItunes}>
                <input type="text" name="term" placeholder="Search titles or artists..."></input>
                <select name="media">
                    <option value="all">All</option>
                    <option value="movie">Movie</option>
                    <option value="tvShow">TV Show</option>
                    <option value="music">Music</option>
                    <option value="podcast">Podcast</option>
                    <option value="musicVideo">Music Video</option>
                    <option value="audiobook">Audio Book</option>
                    <option value="ebook">E Book</option>
                </select>
                <button>Search</button>
            </form>
        </div>
    )
}
