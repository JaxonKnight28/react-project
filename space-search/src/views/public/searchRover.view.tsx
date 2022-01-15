import { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react"
import { Rovers } from "../../components/rover.comp";


export type SearchFormValues = {
    year?: string;
    month?: string;
    day?: string;
    rover?: string;
}

export function SearchRover() {
    const [searchData, setSearchData] = useState<SearchFormValues>({})
    const [newData, setNewData] = useState<boolean>(false)
    const handleSubmit = () => {
        setNewData(true)

    }

    const handleChange = ({ target: { value, name } }: any) => {
        setSearchData({ ...searchData, [name]: value })
        setNewData(false)
    }

    return (
        <Container >
            <Container textAlign="center">
                <h3>Here you can pick a, earth date and a Mars rover.
                    It will show all the pictures from that earth day if they exist
                </h3>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Year</label>
                    <input placeholder="Year" name="year" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Month</label>
                    <input placeholder="Month" name="month" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Day</label>
                    <input placeholder="Day" name="day" onChange={handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Rover</label>
                    <select className="ui fluid dropdown" name="rover" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </Form.Field>



                <Button type="submit">Search</Button>
            </Form>
            {newData && <Rovers data={searchData} />}
        </Container >
    )
}
//<Rovers search={searchData}
//<pre>{JSON.stringify(searchData, null, 2)}</pre>