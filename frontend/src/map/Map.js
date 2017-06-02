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
                <div className="day-picker">
                    {this.props.map.weather_data.list.map((element, idx) => {
                        let current_day = new Date(Date.now() + (idx * 24 * 60 * 60 * 1000));
                        let current = current_day.getDay();
                        let day;
                        if (idx === 0) {
                            day = 'Today';
                        } else if (idx === 1) {
                            day = 'Tomorrow';
                        } else {
                            if (current === 0) {
                                day = 'Sunday';
                            } else if (current === 1) {
                                day = 'Monday';
                            } else if (current === 2) {
                                day = 'Tuesday';
                            } else if (current === 3) {
                                day = 'Wednesday';
                            } else if (current === 4) {
                                day = 'Thursday';
                            } else if (current === 5) {
                                day = 'Friday';
                            } else if (current === 6) {
                                day = 'Saturday';
                            }
                        }
                        let dateString = (current_day.getMonth() + 1).toString() + '/' + current_day.getDate().toString() + '/' + current_day.getFullYear().toString()
                        return (
                            <div key={idx} className="signup_section">
                                <div className="day_button signup_section" onClick={(event) => this.props.setDay(dateString)}>
                                    <div>{day}: </div>
                                    <img src={`http://openweathermap.org/img/w/${element.weather[0].icon}.png`} />
                                    <div>
                                        {Math.round((element.temp.day * (9/5)) - 459.67)}°
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="time-picker">
                    <div className="time-inputs">
                        <select value={this.props.map.selected_hour} onChange={event => this.props.changeTime(event.target.value, 'hour')}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>:
                        <select value={this.props.map.selected_minute} onChange={event => this.props.changeTime(event.target.value, 'minute')}>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select value={this.props.map.selected_ampm} onChange={event => this.props.changeTime(event.target.value, 'ampm')}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <div className="signup_button" onClick={event => this.props.enterTime(this.props.map.selected_hour,this.props.map.selected_minute,this.props.map.selected_ampm)}>Choose Time</div>
                </div>
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
