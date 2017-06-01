import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';

class Map extends React.Component {
    render() {
        let parkList = this.props.map.parks_ready ? (
            <div className="park-set">
                {this.props.map.parks_data.map((park,idx) => (
                    <div key={idx} className="park">
                        <div className="park_name">{park.name}</div>
                        <div className="park_address">{park.address}</div>
                        <div className="park_address signup_section">
                            {((this.props.planning.park && this.props.planning.park.park_id &&  (this.props.planning.park.park_id === park.park_id))) ?
                                <div className="park-button" onClick={() => {this.props.removePark(park)}}>Remove Park</div>
                                :
                                <div className="park-button" onClick={() => this.props.selectPark(park, this.props.planning.park)}>Select Park</div>}
                        </div>
                    </div>
                ))}
            </div>
        ) : "";
        let weatherFrame = this.props.map.weather_ready ? (
            <div className="date-picker">
                {this.props.map.weather_data.list.map((element, idx) => (
                    <div key={idx} className="signup_section">
                        <div className="signup_button" onClick={(event) => this.props.selectDay(idx)}>
                            Day {idx}: {element.weather[0].main}
                        </div>
                    </div>
                ))}
            </div>
        ) : "";
        let zipEntry = this.props.map.weather_ready || this.props.map.parks_ready ? (
            <div className="zip-entry">
                <div className="signup_button" onClick={(event) => {this.props.resetZip()}}>Search a different location</div>
            </div>
        ) : (
            <div className="zip-entry">
                <input type="text" id="search_zip" value={this.props.map.search_zip} placeholder="Enter ZIP code here:" onChange={(event) =>  {this.props.changeZip(event.target.value)}} />
                <div className="signup_button" onClick={(event) => {this.props.getParksAndWeather(this.props.map.search_zip);}}>Search</div>
            </div>
        );
        return (
            <div className="plan_part plan_part_wrap">
                <div className="map-wrapper">
                    {zipEntry}
                    {parkList}
                    {weatherFrame}
                </div>
            </div>
        );
    }
}

const MapContainer = ReactRedux.connect(
  state => ({ map: state.map, planning: state.planning }),
  actions
)(Map);

export default MapContainer;
