
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addPerson } from '../store/features/personSlice';

interface Country {
    label: string;
    value: string;
}

interface FormValues {
    address?: string;
    state?: string;
    city?: string;
    pincode?: string;
    country: string;
}

const schema = yup.object().shape({
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    pincode: yup.string(),
    country: yup.string().test('required', 'Country is required', function (value) {
        const isCountrySelected = Boolean(value);
        return isCountrySelected || this.createError({ path: 'country', message: 'Country is required' });
    }),

});

const Step2Form: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const step1FormData = location.state?.formData || {};
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
        resolver: yupResolver(schema) as any,
    });
    const navigate = useNavigate();
    const [countryOptions, setCountryOptions] = useState<Country[]>([]);
    const selectedCountry = watch('country');
    const loadOptions = async (inputValue: string) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${inputValue}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                const countries: Country[] = data.map((country: any) => ({
                    label: country.name.common,
                    value: country.name.common,
                }));
                return countries;
            } else {
                console.error('Received data is not an array:', data);
                return [];
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    };
    console.log(step1FormData);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        dispatch(
            addPerson({
              name: (step1FormData as any).name,
              age: (step1FormData as any).age,
              mobile: (step1FormData as any).mobile,
              sex: (step1FormData as any).sex,
              govtIdType: (step1FormData as any).govtIdType,
              govtId: (step1FormData as any).govtId,
              address: data.address,
              state: data.state,
              city: data.city,
              pincode: data.pincode,
              country: data.country,
            })
          );
    };
    const handleCountryChange = (selectedOption: any) => {
        setValue('country', selectedOption?.value); 
    };

    return (<>
        <h1 className='text-3xl font-semibold text-center m-5 uppercase'>Step 2 : <span className='text-slate-700'>Form </span> <span className='text-slate-500 '>Registration</span></h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md flex flex-col gap-2">
            <TextField label="Address" {...register('address')} error={Boolean(errors.address)} fullWidth className="mb-4" />
            <TextField label="State" {...register('state')} error={Boolean(errors.state)} fullWidth className="mb-4" />
            <TextField label="City" {...register('city')} error={Boolean(errors.city)} fullWidth className="mb-4" />

            <label htmlFor="country">Country</label>
            <AsyncSelect
                id="country"
                {...register('country')}
                loadOptions={loadOptions}
                onChange={handleCountryChange}
                className={selectedCountry && errors.country ? 'is-invalid' : ''}
            />

            {!selectedCountry && errors.country && (
                <span className="text-red-500">{errors.country?.message}</span>
            )}
            {selectedCountry && (

                <TextField type='number' label="Pincode" {...register('pincode')} error={Boolean(errors.pincode)} fullWidth className="mb-4" />)}

            <Button type="submit" variant="contained" color="primary" fullWidth className="py-2">
                Submit
            </Button>
        </form>
    </>
    );
}

export default Step2Form;
