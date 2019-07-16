import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderSearchOptions = this.renderSearchOptions.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  renderSearchOptions() {
    const regEx = new RegExp(this.state.value, "gi");
    const sweden = this.props.countries.find(c => c.name === "Sweden");

    return (
      <div className="search-options">
        {this.props.countries.map(country => {
          if (country.name.match(regEx)) {
            return (
              <div
                className="option"
                key={country.name}
                onClick={() => this.props.selectCountry(country, sweden)}
              >
                <p>{country.name}</p>
              </div>
            );
          }
          return "";
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="search">
        <form autoComplete="off">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            id="search"
            required
          />
          <label htmlFor="search">SEARCH COUNTRY</label>
        </form>
        {this.state.value !== "" ? this.renderSearchOptions() : null}
      </div>
    );
  }
}

export default Search;
