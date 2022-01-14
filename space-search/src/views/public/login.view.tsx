import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "semantic-ui-react";
import { Login, LoginValues } from "../../components/login.com";
import users from '../../dataLayers/users.json'

export function LoginView() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignIn = async (formValues: LoginValues) => {
        const { username, password } = formValues;
        if (!username || !password) {
            return
        }
        users.forEach(user => {
            if (user.username === username && user.password === password) {
                console.log('did it');
                window.localStorage.setItem('space-user', JSON.stringify(user))
                navigate('/')
            }
        });
    }
    return (
        <Container style={{ width: 400, margin: 48 }}>
            {loading ? <span>Loading...</span> : null}
            <Login onSuccess={handleSignIn} />
        </Container>
    )
}