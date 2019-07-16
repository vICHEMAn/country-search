import React, { Component } from "react";

class SelectedCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateExchange = this.calculateExchange.bind(this);
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  calculateExchange() {
    const { amount } = this.state;
    const { country, exchangeRates } = this.props;

    if (exchangeRates === null) return "pending";
    if (amount === undefined) return 0;

    const currencyCode = country.currencies[0].code;
    const converted =
      (amount / exchangeRates.rates["SEK"]) * exchangeRates.rates[currencyCode];

    return converted.toFixed(2);
  }

  render() {
    const { country, goBack, sweden } = this.props;
    return (
      <div className="selected-country">
        <div className="top">
          <img src={country.flag} alt={`${country.name}'s flag`} />
          <h2>{country.name}</h2>
        </div>
        <div className="info">
          <h4>Capital:</h4>
          <p>{country.capital}</p>
          <h4>Population</h4>
          <p>{country.population}</p>
          <h4>Currency:</h4>
          <p>
            {country.currencies[0].name} ({country.currencies[0].code})
          </p>
        </div>
        <h4 className="exchange-label">Exchange from Swedish Krona (SEK)</h4>
        <div className="exchange">
          <img
            src={sweden.flag}
            alt={`${sweden.name}'s flag`}
            className="exchange-flag"
          />
          <p>{sweden.currencies[0].code}</p>
          <input
            type="number"
            value={this.state.amount || ""}
            onChange={this.handleChange}
            placeholder="Set amount"
          />
        </div>
        <div className="exchange">
          <img
            src={country.flag}
            alt={`${country.name}'s flag`}
            className="exchange-flag"
          />
          <p>{country.currencies[0].code}</p>
          <p className="calculated-exchange">{this.calculateExchange()}</p>
        </div>
        <button onClick={() => goBack()}>BACK</button>
      </div>
    );
  }
}

export default SelectedCountry;
