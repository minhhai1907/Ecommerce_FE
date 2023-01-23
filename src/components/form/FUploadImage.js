import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import UploadSingleFile from "../UploadSingleFile";

function FUploadImage({ name, idx, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadSingleFile
            accept="image/*"
            file={field.value[idx]}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            sx={{ width: "150px", height: "320px" }}
            {...other}
          />
        );
      }}
    />
  );
}

export default FUploadImage;
