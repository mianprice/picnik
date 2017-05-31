import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Drinks.actions';

class Drinks extends React.Component {
    render() {
        let beer_set = this.props.planning.beers.map(beer => {
            return beer.beer_id;
        });
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

                    {beer_set.includes(item.beer_id) ?
                    <div className="drink-buttons" onClick={() => {this.props.removeBeer(item)}}>Remove from Picnik</div>
                    :
                    <div className="drink-buttons" onClick={() => this.props.selectBeer(item)}>Add to Picnik</div>}

                    <div className="check_mark">{item.class === "beer paired-beer" ? <i className="fa fa-fw fa-beer" style={{color: "green"}} alt="beer pint"  /> : null}</div>

                    <div className="recipe-buttons" onClick={() => this.props.saveForLater(item, this.props.login.user_id)}>Save for later</div>
                </div>
            );
        });
        let wine_set = this.props.planning.wines.map(wine => {
            return wine.wine_id;
        });
        let wine_view = this.props.drinks.wine_set.map((item, idx) => {
            if (item.class.includes('paired-wine')) {
            }
            return (
                <div className={item.class} key={idx}>
                    <div>
                        {item.name}
                    </div>
                    <img src={item.image_link} alt={item.name} />

                    {wine_set.includes(item.wine_id) ?
                    <div className="drink-buttons" onClick={() => {this.props.removeWine(item)}}>Remove from Picnik</div>
                    :
                    <div className="drink-buttons" onClick={() => this.props.selectWine(item)}>Add to Picnik</div>}

                    <div className="check_mark">{item.class === "wine paired-wine" ? <i className="fa fa-fw fa-glass" style={{color: "purple"}} alt="glass"  /> : null}</div>

                    <div className="recipe-buttons" onClick={() => this.props.saveForLater(item, this.props.login.user_id)}>Save for later</div>
                </div>
            );
        });
        return (
            <div className="plan_part">
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
  state => ({ drinks: state.drinks, signup: state.signup, food: state.food, login: state.login, planning: state.planning }),
  actions
)(Drinks);

export default DrinksContainer;
