import React, { Component } from "react";
import "./App.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Search from "./components/Search";
import SelectedCountry from "./components/SelectedCountry.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: null,
      sweden: null,
      countries: [],
      exchangeRates: null
    };
    this.selectCountry = this.selectCountry.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentDidMount() {
    const countriesResponse = await fetch(
      "https://restcountries.eu/rest/v2/all"
    );
    const exchangeResponse = await fetch(
      "http://data.fixer.io/api/latest?access_key=584cbcc4ec669ff1a02eebb5b4455263"
    );

    const countriesJson = await countriesResponse.json();
    this.setState({ countries: countriesJson });

    const exchangeJson = await exchangeResponse.json();
    this.setState({ exchangeRates: exchangeJson });
  }

  selectCountry(country, sweden) {
    this.setState({ selectedCountry: country, sweden });
  }

  goBack() {
    this.setState({ selectedCountry: null });
  }

  render() {
    const { countries, exchangeRates, sweden, selectedCountry } = this.state;
    return (
      <TransitionGroup exit={false} className="app">
        {this.state.selectedCountry === null ? (
          <CSSTransition
            timeout={500}
            classNames="fade-fast"
            appear
            key="search"
          >
            <Search selectCountry={this.selectCountry} countries={countries} />
          </CSSTransition>
        ) : (
          <CSSTransition
            timeout={500}
            classNames="fade-fast"
            appear
            key="selected"
          >
            <SelectedCountry
              country={selectedCountry}
              sweden={sweden}
              goBack={this.goBack}
              exchangeRates={exchangeRates}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  }
}

export default App;
