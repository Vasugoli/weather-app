// import {Avatar, AvatarIcon, Button, Input} from "@nextui-org/react";
// import { useState } from "react";
//
// import axios from "axios";

import WeatherCard from "./components/WeatherCard";

const App = () => {
    // const [city, setCity] = useState("");
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    //
    // let fetchData = async () => {
    //     try {
    //         if (!city) {
    //             setError("Please enter a city name");
    //             setData(null);
    //             return;
    //         }
    //         const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    //         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    //             params : {
    //                 q: city,
    //                 appid: WEATHER_API_KEY,
    //                 units: 'metric'
    //             }
    //         });
    //         setData(response.data);
    //         setError(null); // Clear any previous errors
    //     }
    //     catch (error) {
    //         setError(error.response ? error.response.data.message : error.message);
    //         console.log(error);
    //         setData(null); // Clear any previous data
    //     }
    // }

    return (
        <div className={"app"}>
            <WeatherCard/>
        </div>
    );
}

export default App;