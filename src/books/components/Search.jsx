
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = ({ target }) => setSearchParams({ q: target.value })
    return (
        <TextField
            variant="outlined"
            placeholder="חיפוש"
            size="large"
            value={searchParams.get("q") ?? ""}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                maxWidth: '400px',
                //display: { xs: "none", sm: "inline-flex" },
                borderRadius: '4px'
            }}
        />
    );
}