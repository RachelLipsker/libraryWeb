import React from 'react'
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import { useCurrentUser } from '../providers/UserProvider';
import useForm from '../../forms/hooks/useForm';
import { Container } from '@mui/material';
import useUsers from '../hooks/useUsers';
import initialSignupForm from '../helpers/initialForms/initialSignupForm';
import signupSchema from '../models/signupSchema';
import SignupForm from '../components/SignupForm';

export default function SignUpPage() {
    const { handleSignup } = useUsers();
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialSignupForm, signupSchema, handleSignup);

    const { user } = useCurrentUser();

    if (user) return <Navigate to={ROUTES.ROOT} replace />;
    return (
        <>
            <Container
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <SignupForm
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    validateForm={validateForm}
                    title={"הרשמה"}
                    errors={errors}
                    data={data}
                    onInputChange={handleChange}
                />
            </Container>
        </>)
}
