import { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";

export function EpicGetter(params: any) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setItems] = useState<any>([]);

    const year = params.data.year
    const month = params.data.month
    const day = params.data.day
    const quality = params.data.quality

    useEffect(() => {
        fetch(`https://epic.gsfc.nasa.gov/api/${quality}/date/${year}-${month}-${day}?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
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

        const arr = Object.assign([], data)
        const len = arr.length

        return (
            <Container textAlign="center">
                <h4>{len} photo(s) from {month}-{day}-{year} (mm-dd-yyy)</h4>
                <Container>
                    {arr.map((item: any) => (
                        <Image key={item.identifier} src={`https://api.nasa.gov/EPIC/archive/${quality}/${year}/${month}/${day}/png/${item.image}.png?api_key=zXuu0a69xd8M3vyEJWURzxgSKDETAoioniuWN2pc`} />
                    ))}
                </Container>
            </Container>

        );
    }
}