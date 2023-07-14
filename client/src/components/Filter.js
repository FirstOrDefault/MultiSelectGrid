import React from 'react';
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Filter({ filterConfig, value, handleFilterChange }) {
  const { fieldType, dataPath, label } = filterConfig;

  if (fieldType === 'TextField') {
    return (
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={(event) => handleFilterChange(event, dataPath)}
        style={{ marginRight: 10}}
      />
    );
  }

  if (fieldType === 'Select') {
    const options = filterConfig.options;

    return (
      <FormControl variant="outlined" style={{ width: 200, marginRight: 10 }}>
        <InputLabel id={`${dataPath}-filter-label`}>{label}</InputLabel>
        <Select
          labelId={`${dataPath}-filter-label`}
          value={value}
          onChange={(event) => handleFilterChange(event, dataPath)}
          label={label}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {options && options.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return null;
}

export default Filter;
