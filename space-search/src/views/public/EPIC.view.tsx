import { useState, useEffect } from "react";
import { Container, Menu, Image } from 'semantic-ui-react'

// api key: zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc
export function EpicPhotoSearch() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://epic.gsfc.nasa.gov/api/enhanced/date/2015-10-31?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc")
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
        return <div>Error: {error['message']}</div>;
    } else if (!isLoaded) {
        return <Container textAlign="center"><div>Loading...</div></Container>;
    } else {
        ///console.log(data)
        return (
            <Container textAlign="center">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <h1>These are images taken from DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument</h1>
                <Container>
                    {data.map((item, index) => (
                        <Image key={item['identifier']} src={`https://epic.gsfc.nasa.gov/archive/enhanced/2015/10/31/png/${item['image']}.png`} fluid />
                    ))}
                </Container>
            </Container>

        );
    }
}