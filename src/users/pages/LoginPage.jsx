import React from 'react'
import { Link, Navigate } from "react-router-dom";
import ROUTES from '../../routes/routerModel';
import { useCurrentUser } from '../providers/UserProvider';
import useForm from '../../forms/hooks/useForm';
import loginSchema from '../models/loginSchema';
import initialLoginForm from '../helpers/initialForms/initialLoginForm';
import { Button, Container, Grid } from '@mui/material';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from '../hooks/useUsers';

export default function LoginPage() {
    const { handleLogin } = useUsers();

    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialLoginForm, loginSchema, handleLogin);

    const { user } = useCurrentUser();

    if (user) return <Navigate to={ROUTES.ROOT} replace />;
    return (
        <>
            <Container>

                <Container
                    sx={{
                        paddingTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Form
                        title="התחברות"
                        styles={{ maxWidth: "450px" }}
                        to={ROUTES.ROOT}
                        onSubmit={onSubmit}
                        onReset={handleReset}
                        validateForm={validateForm}
                    >
                        <Input
                            label="אימייל"
                            name="email"
                            type="email"
                            error={errors.email}
                            onChange={handleChange}
                            data={data}
                        />
                        <Input
                            label="סיסמא"
                            name="password"
                            type="password"
                            error={errors.password}
                            onChange={handleChange}
                            data={data}
                        />
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component={Link}
                                to={ROUTES.SIGNUP}
                                startIcon={<AccountBoxIcon />}
                                sx={{ width: "100%" }}
                            >
                                הרשמה
                            </Button>
                        </Grid>
                    </Form>
                </Container>
            </Container>
        </>
    )
}
