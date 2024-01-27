// Step1Form.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';



interface FormValues {
    name: string;
    age: string;
    mobile: string;
    // Assuming it's a string, update it accordingly
    sex: string;
    govtIdType: string;
    govtId: string;
}
const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    age: yup
        .string()
        .required('Age is required')
        .test('is-positive', 'Age must be a positive integer', (value) => {
            if (!value) return false; // Handle empty string or null as you need
            const numericValue = Number(value);
            return !isNaN(numericValue) && numericValue > 0 && Number.isInteger(numericValue);
        }),
    sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
    mobile: yup.string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
    govtIdType: yup.string().required('Government ID type is required'),
    govtId: yup.string().test('govtId', 'Invalid ID number', function (value) {
        const govtIdType = this.parent.govtIdType;
        if (govtIdType === 'Aadhar') {
            return yup.string().required('Aadhar is required').matches(/^[2-9]\d{11}$/, 'Invalid Aadhar number').isValidSync(value);
        } else {
            return yup.string().required('PAN is required').matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN number').isValidSync(value);
        }
    }) as yup.StringSchema<string>,
});

const Step1Form: React.FC = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });



    const navigate = useNavigate();


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        navigate('/step2', { state: { formData: data } });
    };

    return (
        <>
    <h1 className='text-3xl font-semibold text-center m-5 uppercase'>Step 1 : <span className='text-slate-700'>Form </span> <span className='text-slate-500 '>Registration</span></h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md flex flex-col gap-2">
            <TextField label="Name" {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} fullWidth className="mb-4" />
            <TextField type='number' label="Mobile" {...register('mobile')} error={Boolean(errors.mobile)} helperText={errors.mobile?.message} fullWidth className="mb-4" />
            <TextField type='number' label="age" {...register('age')} error={Boolean(errors.age)} helperText={errors.age?.message} fullWidth className="mb-4" />

            <div className="flex mb-4">
                <FormControl className="flex-grow mr-4">
                    <InputLabel id="sex-label">Sex</InputLabel>
                    <Select labelId="sex-label" {...register('sex')} error={Boolean(errors.sex)} fullWidth>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="flex-grow">
                    <InputLabel id="govtIdType-label">Govt Issued ID</InputLabel>
                    <Select labelId="govtIdType-label" {...register('govtIdType')} error={Boolean(errors.govtIdType)} fullWidth>
                        <MenuItem value="Aadhar">Aadhar</MenuItem>
                        <MenuItem value="PAN">PAN</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <TextField label="Govt Issued ID Number" {...register('govtId')} error={Boolean(errors.govtId)} helperText={errors.govtId?.message} fullWidth className="mb-4" />

            <Button type="submit" variant="contained" color="primary" fullWidth className="py-2">
                Next
            </Button>
        </form></>
    );
}

export default Step1Form;
