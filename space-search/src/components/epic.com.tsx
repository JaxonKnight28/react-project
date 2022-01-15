import { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";

export function EpicGetter(params: any) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setItems] = useState<any>([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://epic.gsfc.nasa.gov/api/enhanced/date/2019-05-30?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc")
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
        console.log(data)

        const arr = Object.assign([], data)
        const len = arr.length

        return (
            <Container textAlign="center">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <h1>These are images taken from DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument</h1>
                <Container>
                    {arr.map((item: any) => (
                        <Image key={item.identifier} src={`https://api.nasa.gov/EPIC/archive/enhanced/2019/05/30/png/${item.image}.png?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc`} />
                        // <div>{item.identifier}</div>
                    ))}
                </Container>
            </Container>

        );
    }
}