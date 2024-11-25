import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../providers/UserProvider';
import useUsers from '../hooks/useUsers';
import useForm from '../../forms/hooks/useForm';
import ROUTES from '../../routes/routerModel';
import { Container } from '@mui/material';
import initialEditUserForm from '../helpers/initialForms/initialEditUserForm';
import editUserSchema from '../models/editUserSchema';
import normalizeUserFromDb from '../helpers/normalizeUserFromDb';
import EditUserForm from '../components/EditUserForm';

export default function EditProfilePage() {
    const { id } = useParams();
    const { user } = useCurrentUser();
    const { handleUpdateUser, getUserById, profile } = useUsers();

    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialEditUserForm, editUserSchema, (data) =>
        handleUpdateUser(id, data)
    );
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (profile) {
            setData(normalizeUserFromDb(profile));
            setTitle(profile.firstName + " " + profile.lastName);
        }
        else {
            getUserById(id);
        }
    }, [user, id, profile]);


    // if (user._id != id) return <Navigate to={ROUTES.ROOT} replace />

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
                <EditUserForm
                    title={" עריכת הפרופיל של " + title}
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    errors={errors}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    data={data}
                />
            </Container>
        </>)
}
