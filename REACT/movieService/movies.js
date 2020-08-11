//installed bootstrap, font-awesome
//command: npm i bootstrap@4.1.1 font-awesome@4.7.0
import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  //handleDelete = movie => {

  //};

  movieList() {
    const m = this.state.movies;
    const items = m.map(
      (movie) => `<tr>
			<td>${movie._id}</td>
			<td>${movie.title}</td>
			<td>${movie.genre.name}</td>
			<td>${movie.numberInStock}</td>
			<td>${movie.dailyRentalRate}</td>
			</tr>`
    );
    return items;
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  //<table border="1">{this.movieList}</table>
  render() {
    const items = this.movieList();
    if (this.state.movies.length === 0) return <p> No movies. </p>;
    return (
      //<React.Fragment>
      //{GoodEvening}
      //table.table>thead>tr>th*4
      <div>
        We have {this.state.movies.length} moives in total.
        <table className="table">
          <thead>
            <tr>
              <th> Title </th>
              <th> Genre </th>
              <th> Stock</th>
              <th> Rate </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="bun btn-danger btn=sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      //</React.Fragment>
    );
  }
}
export default Movies;
