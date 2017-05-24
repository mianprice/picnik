import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Drinks.actions';

class Drinks extends React.Component {
    componentDidMount() {
        this.props.getWine();
    }
    render() {
        let beer_view = this.props.drinks.beer_set.map((item) => {
            let label = item.labels ? (
                <img src={item.labels.icon} alt={item.name} />
            ) : "";
            return (
                <div key={item.id}>
                    <div className={item.class}>
                        {item.name}
                    </div>
                    {label}
                    <button onClick={() => this.props.selectBeer(item.id)}>Select</button>
                </div>
            );
        });
        let wine_view = this.props.drinks.wine_set.map((item) => {
            return (
                <div key={item.code}>
                    <div>
                        {item.name}
                    </div>
                    <img src={item.image} alt={item.name} />
                    <button onClick={() => this.props.selectWine(item.code)}>Select</button>
                </div>
            );
        });
        return (
            <div className="plan_part">
                Drinks TEST
                <div className="beers">
                    {beer_view}
                </div>
                <div className="wines">
                    {wine_view}
                </div>
            </div>
        );
    }
}

const DrinksContainer = ReactRedux.connect(
  state => ({ drinks: state.drinks, signup: state.signup, food: state.food }),
  actions
)(Drinks);

export default DrinksContainer;
