import { useState, useEffect } from "react";
import { Container } from 'semantic-ui-react'

// api key: zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc
export function PhotoOfTheDay() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://api.nasa.gov/planetary/apod?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Container textAlign="center"><div>Loading...</div></Container>;
    } else {
        return (
            <Container textAlign="center">
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <h1>{data.title}</h1>
                <img src={data.url} alt="" />
                <p>{data.explanation}</p>
            </Container>

        );
    }
}
