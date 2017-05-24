import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';

class Map extends React.Component {
  render() {
      let mapFrame = this.props.map.link_complete ? (
          <iframe style={{border:0,width:80+'%',height:200,frameborder:0}} src={`https://www.google.com/maps/embed/v1/search?q=parks+near+${this.props.map.search_zip}&key=AIzaSyDv9Qh_jkxeOTNk0V85c3PZl8axCNxENAg`} ></iframe>
      ) : "";
      let parkList = "";
      let weatherFrame = this.props.map.weather_ready ? (
          <div className="signup_section">
            {this.props.map.weather_data.list.map((element, idx) => (
                <div key={idx} className="signup_section">
                    <div className="signup_button">
                        Day {idx}: {element.weather[0].main}
                    </div>
                </div>
            ))}
          </div>
      ) : "";
      let zipEntry = this.props.map.weather_ready || this.props.map.link_complete ? (
          <div className="signup_button" onClick={(event) => {this.props.resetZip()}}>Search a different location</div>
      ) : (
          <div className="signup_section">
              <input type="text" id="search_zip" value={this.props.map.search_zip} placeholder="Enter ZIP code here:" onChange={(event) =>  {this.props.changeZip(event.target.value)}} />
              <div className="signup_button" onClick={(event) => {this.props.showMap();this.props.getWeather(this.props.map.search_zip);}}>Search</div>
          </div>
      )
      return (
            <div className="plan_part">
                {zipEntry}
                {mapFrame}
                {parkList}
                {weatherFrame}
                <div id="map"></div>
            </div>
      );
  }
}

const MapContainer = ReactRedux.connect(
  state => ({ map: state.map }),
  actions
)(Map);

export default MapContainer;
