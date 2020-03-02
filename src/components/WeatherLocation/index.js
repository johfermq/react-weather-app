import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import { API_URL } from './../../constants/enviroments';
import { transformWeather } from './../../services/transformWeather';

import './styles.css';

const data = {
    humidity: 0,
    temperature: 0,
    weatherState: '--',
    wind: '--- m/s',
}

class WeatherLocation extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            city: 'London, Uk',
            data,
            loading: true
        }

        this.handleUpdateClick();
    }

    handleUpdateClick = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: transformWeather(response),
                    loading: false
                });
            });
    }

    render() {
        const { city, data, loading } = this.state;

        return (
            <div className="weatherLocationCont">
                <Location city={city} />
                <WeatherData data={data} />
                { loading ? <p>Loading ...</p> : null }
            </div>
        );
    }
}

/*WeatherLocation.propTypes = {
    city: PropTypes.string,
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.string.isRequired,
    }),
}*/

export default WeatherLocation;