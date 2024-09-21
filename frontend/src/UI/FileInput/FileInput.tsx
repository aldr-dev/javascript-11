import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {useAppSelector} from '../../app/hooks';
import {selectCreateError} from '../../features/products/productsSlice';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  resetFileName: boolean;
  handleResetFileName: (status: boolean) => void;
}

const FileInput: React.FC<Props> = ({onChange, name, label, resetFileName, handleResetFileName}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const error = useAppSelector(selectCreateError);

  useEffect(() => {
    if (resetFileName) {
      setFilename('');
      handleResetFileName(false);
    }
  }, [resetFileName, handleResetFileName]);

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFilename(event.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(event);
  };

  return (
    <>
      <input type="file" required name={name} style={{display: 'none'}} ref={inputRef} onChange={onFileChange}/>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            required
            label={label}
            InputProps={{readOnly: true}}
            value={filename}
            onClick={activateInput}
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={activateInput}>
            Выбрать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;