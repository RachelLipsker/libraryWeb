import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Grid, Autocomplete, TextField, FormControl, FormHelperText } from "@mui/material";

export default function BookForm({
    onSubmit,
    onReset,
    validateForm,
    title,
    errors,
    data,
    onInputChange,
    authors,
    genres,
    handleChangeSelect
}) {
    return (
        <Form
            onSubmit={onSubmit}
            onReset={onReset}
            validateForm={validateForm}
            title={title}
            styles={{ maxWidth: "800px" }}
        >

            {/* Autocomplete for Author */}
            <Grid item sm={6}>
                <FormControl fullWidth error={Boolean(errors.author)} sx={{ textAlign: 'right' }}>
                    <Autocomplete
                        value={authors?.find((author) => author._id === data.author) || null}
                        onChange={(event, newValue) => {
                            onInputChange({ target: { name: "author", value: newValue?._id || "" } });
                        }}
                        options={authors || []}
                        getOptionLabel={(option) => option.name || ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="סופר"
                                error={Boolean(errors.author)}
                                helperText={errors.author}
                                fullWidth
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        disableClearable
                    />
                    {errors.author && <FormHelperText>{errors.author}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Autocomplete for Genre */}
            <Grid item sm={6}>
                <FormControl fullWidth error={Boolean(errors.genre)} sx={{ textAlign: 'right' }}>
                    <Autocomplete
                        value={genres?.find((genre) => genre._id === data.genre) || null}
                        onChange={(event, newValue) => {
                            onInputChange({ target: { name: "genre", value: newValue?._id || "" } });
                        }}
                        options={genres || []}
                        getOptionLabel={(option) => option.name || ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="ז'אנר"
                                error={Boolean(errors.genre)}
                                helperText={errors.genre}
                                fullWidth
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        disableClearable
                    />
                    {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
                </FormControl>
            </Grid>

            <Input
                name="title"
                label="כותרת"
                error={errors.title}
                onChange={onInputChange}
                data={data}
                sm={6}
            />


            <Input
                name="image"
                label="כתובת url של תמונה"
                error={errors.imageUrl}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="alt"
                label="טקסט אלטרנטיבי"
                error={errors.imageAlt}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
        </Form>
    );
}
