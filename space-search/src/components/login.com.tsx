import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Form } from "semantic-ui-react"

//set types
export type LoginValues = {
    username?: string;
    password?: string;
}

type LoginProps = {
    onSuccess: (formValues: LoginValues) => void;
    onError?: (errors: any) => void;
}

export function Login({ onSuccess, onError }: LoginProps) {
    const { handleSubmit, register } = useForm<LoginValues>({
        mode: 'onSubmit',
        defaultValues: {}
    })

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <Form.Field>
                <label>Username/Email</label>
                <input {...register("username")} placeholder="username/email" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input {...register("password")} type="password" placeholder="password" />
            </Form.Field>
            <Button type="submit">Sign In</Button>
        </Form>
    );
}