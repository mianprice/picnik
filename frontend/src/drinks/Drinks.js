import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Drinks.actions';

class Drinks extends React.Component {
    componentDidMount() {
        // this.props.getWine();
    }
    render() {
        let beer_view = this.props.drinks.beer_set.map((item) => {
            let label = item.labels ? (
                <img src={item.labels.icon} alt={item.name} />
            ) : "";
            return (
                <div key={item.id} className={item.class}>
                    <div >
                        {item.name}<br/>
                        {item.breweries[0].name}
                    </div>
                    {label}
                    <div className="drink-buttons" onClick={() => this.props.selectBeer(item.id)}>Select</div>
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
                    <div className="drink-buttons" onClick={() => this.props.selectWine(item.code)}>Select</div>
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
