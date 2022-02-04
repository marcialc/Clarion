import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const AutoFillDropDown = ({ list, callback, label }: DropDownProps) => {
  const [value, setValue] = useState('');

  const handleChange = (input: string) => {
    console.log("input: ",input)
    setValue(input);
    if(list.includes(input)) callback(input);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string) => {
          handleChange(newValue);
        }}
        options={list}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}

type DropDownProps = {
  list: any[],
  callback: Function,
  label: string,
}

export default AutoFillDropDown;
