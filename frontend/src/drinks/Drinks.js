import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Drinks.actions';
import beer_pint from './pint.svg';

class Drinks extends React.Component {
    componentDidMount() {
        // this.props.getWine();
    }
    render() {
        let beer_view = this.props.drinks.beer_set.map((item) => {
            let label = item.label_image_link_icon ? (
                <img src={item.label_image_link_icon} alt={item.beer_name} />
            ) : "";
            return (
                <div key={item.beer_id} >
                    <div >
                        {item.beer_name}<br/>
                        {item.brewery_name}
                    </div>
                    {label}
                    <div className="drink-buttons" onClick={() => this.props.selectBeer(item.beer_id)}>Select</div>
                    <div className="check_mark">{item.class === "beer paired-beer" ? <img className="check_mark" alt="beer pint" src={beer_pint} /> : null}</div>
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
