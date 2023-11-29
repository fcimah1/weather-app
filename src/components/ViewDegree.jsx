import { useEffect, useState } from "react";

export default function ViewDegree() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=cairo';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c4e5e0f32amsh0a0aa80b4fe7770p1ffeecjsnf395a4a57a67',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    const [data, setData] = useState()
    useEffect(() => {
        fetch(url, options)
            .then((res) => res.json())
            .then(value => setData(value))
    }, [])
    console.log(data)

    return (
        <>
          
        </>
    )
}
