import {useEffect, useState} from 'react';
import axios from "axios";
// import './WeatherMetric.css';
import search_icon from "../assets/search.png"



const Weather = () => {
    // const [city, setCity] = useState("");
    // const [data, setData] = useState(false);
    const [icon , setIcon] = useState(`04n`);
    const [image,setImage] = useState(" ");

    useEffect(() => {



    },[icon]);

    return (
        <div className={"weather"}>
            <h1 className={"name"}>Weather Flow</h1>
            <div className={"search_box"}>
                <input className={"search_bar"} type={"text"} placeholder={"Enter the city.."}/>
                <img src={search_icon} className={"search_icon"}  alt={"search"}/>
            </div>
            <div className={"main_display"}>
                <img className={"main_icon"} src={image.toString()} alt={"icon"}/>
                <div className={"main_data"} >
                    <p className={"temp"}>16°C</p>
                    <p className={"loc"}>London</p>
                </div>

                <div className={"info"}>
                    <div className={"col"}>
                        <span className="material-symbols-outlined">wind_power</span>
                    </div>
                    <span className="material-symbols-outlined">
humidity_percentage
</span>
                </div>
            </div>
        </div>
    );
}

export default Weather;