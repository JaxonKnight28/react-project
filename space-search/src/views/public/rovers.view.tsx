// https://images-api.nasa.gov/search?q=space
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc

import { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";
import { JsonObjectExpression } from "typescript";


interface photos {
    items: {};
    photos?: {};
}

export function Rovers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-1-12&api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc")
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
        return <div>Loading...</div>;
    } else {

        const arr = Object.assign([], items.photos)
        console.log('arr', arr);

        return (
            <Container>
                {/* <pre>{JSON.stringify(items.photos, null, 2)}</pre> */}

                {arr.map((item: any) => (
                    <Image key={item.id} src={item.img_src} />
                ))}
            </Container >
        );
    }
}