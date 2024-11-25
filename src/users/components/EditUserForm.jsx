import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";

export default function EditUserForm({
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
                name="phone"
                label="פלאפון"
                type="phone"
                error={errors.phone}
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
