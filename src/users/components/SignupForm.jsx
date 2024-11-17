import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";

export default function SignupForm({
    onSubmit,
    onReset,
    validateForm,
    title,
    errors,
    data,
    onInputChange,
}) {
    return (
        <Form
            onSubmit={onSubmit}
            onReset={onReset}
            validateForm={validateForm}
            title={title}
            styles={{ maxWidth: "800px" }}
        >
            <Input
                name="firstName"
                label="שם פרטי"
                error={errors.firstName}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="lastName"
                label="שם משפחה"
                error={errors.lastName}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="phone"
                label="פלאפון"
                type="phone"
                error={errors.phone}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="email"
                label="אימייל"
                type="email"
                error={errors.email}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="password"
                label="סיסמא"
                type="password"
                error={errors.password}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="image"
                label="כתובת url של תמונה"
                error={errors.image}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="alt"
                label="טקסט אלטרנטיבי"
                error={errors.alt}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
        </Form>
    );
}
