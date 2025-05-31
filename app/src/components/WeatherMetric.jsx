
import  "./WeatherMetric.css";

// eslint-disable-next-line react/prop-types
function WeatherMetric({ value, label, icon, iconAlt }) {
    return (
        <div className="box">
            <div className="box-value">
                {value}
            </div>
            <div className="box-info">
                <img
                    loading="lazy"
                    src={icon}
                    alt={iconAlt}
                    className="box-info-icon"
                />
                <div className={"box-info-label"}>{label}</div>
            </div>
        </div>
    );
}

export default WeatherMetric;