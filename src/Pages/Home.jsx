import { useEffect, useRef, useState } from "react";
import BoxView from "../components/BoxView";

export default function Home() {

    const inpValue = useRef()
    const [textValue, setTextValue] = useState(getLocation())
    const [data, setData] = useState([])
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        }
    }
    function showPosition(position) {
        setTextValue(`${position.coords.latitude},${position.coords.longitude}`);
    }
    useEffect(() => {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${textValue}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c4e5e0f32amsh0a0aa80b4fe7770p1ffeecjsnf395a4a57a67',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        fetch(url, options)
            .then((res) => res.json())
            .then(value => setData(value))
            .catch()
    }, [textValue])

    const date = new Date();
    const dateString = date.toDateString().split(" ");

    const timeString = date.toTimeString().split(" ");
    const clock = timeString[0].split(":");
    const hour = clock[0];
    const minute = clock[1];
    let amOrPm;
    if (hour >= 12) {
        amOrPm = "PM"
    } else {
        amOrPm = "AM"
    }


    return (
        <>
            <div className="container pt-5">
                <h2 className="card-title text-center p-4">Weather Now</h2>

                <div className="row">
                    <div className="col-md-4 col-sm-6 col-10 left-side  h-100">
                        <div className="left-side-info text-center fs-3 p-3 bg-white" >
                            <div className="d-flex" role="search">
                                <input ref={inpValue} className="form-control me-2"
                                    type="search" placeholder="Search" aria-label="Search" />
                                <button onClick={() => {
                                    (inpValue.current.value !== "") ? setTextValue(inpValue.current.value) : console.log();
                                }} className="btn btn-primary" type="submit">Search</button>
                            </div>
                            <div className="img">
                                <img src={data?.current?.condition?.icon} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <div className="card-text">{data?.current?.temp_c}<sup>°C</sup></div>
                                <div className="card-text fs-4">{data?.current?.condition.text}</div>
                                <p className="card-text fs-5">{`${dateString[2]}-${dateString[1]}-${dateString[3]}`}</p>
                                <p className="card-text fs-5">{`${dateString[0]}, ${hour}:${minute} ${amOrPm}`}</p>
                                <p className="card-text fs-5">{data?.location?.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-6 col-md-8 ">
                        <div className="row ">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="Wind"
                                    bodyData={`${data?.current?.wind_kph} km/h`}
                                    extraData={data?.current?.wind_dir} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="Humadity"
                                    bodyData={`${data?.current?.humidity} %`} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="Real Feel"
                                    bodyData={`${data?.current?.temp_c}°C`}
                                    extraData={data?.current?.condition?.text} />

                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="UV index"
                                    bodyData={`${data?.current?.uv}`} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="Pressure"
                                    bodyData={`${data?.current?.pressure_mb}`} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <BoxView headData="Country"
                                    bodyData={`${data?.location?.country}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
