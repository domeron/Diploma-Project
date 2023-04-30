import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { api_GetUserShippingAddress } from "../../api/user_api";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddressAddForm from "../address/AddressAddForm";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { api_GetAllCountries } from "../../api/country_api";
import { api_UpdateUserShippingAddress } from "../../api/address_api";

export default function ShippingAddressInformation() {
    const {user} = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [countries, setCountries] = useState([])
    const [shippingAddress, setShippingAddress] = useState(null);
    const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm();
    const watchCountry = watch('countryId');
    const watchCity = watch('city');
    const watchStreet = watch('streetAddress');
    const watchStreet2 = watch('streetAddress2');
    const watchState = watch('state');
    const watchPostal = watch('postalCode');
    const watchPhone = watch('phoneNumber');
    const watchFullName = watch('fullName');

    useEffect(() => {
        loadShippingAddress();
    }, [])

    async function loadShippingAddress() {
        await api_GetUserShippingAddress(user.userId)
        .then((data) => {
            console.log(data)
            setShippingAddress(data);
            resetForm()
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    function resetForm() {
        setValue('addressId', shippingAddress.id)
        setValue('userId', user.userId)
        setValue('countryId', shippingAddress.countryId)
        setValue('city', shippingAddress.city)
        setValue('state', shippingAddress.state)
        setValue('streetAddress', shippingAddress.streetAddress)
        setValue('streetAddress2', shippingAddress.streetAddress2)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('phoneNumber', shippingAddress.phoneNumber)
        setValue('fullName', shippingAddress.fullName)
    }

    async function loadCountries() {
        await api_GetAllCountries()
        .then(setCountries)
        .catch(err => console.log(err))
    }

    async function updateAddress(data) {
        await api_UpdateUserShippingAddress(data)
        .then((response) => {
            console.log(response)
            setEditing(false);
            loadShippingAddress();
        })
        .catch(err => console.log(err))
    }

    async function createShippingAddress() {

    }
    return (
        <div className="px-8 pt-4 pb-16">
            <div className="py-4 mb-4 border-b border-gray-300">
                <p className="text-3xl">Shipping Address</p>
            </div>
            {!editing && shippingAddress &&
                <div>
                    {/* C1OUNTRY */}
                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>Country</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.countryName}</p>
                        </div>
                    </div>

                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>City</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.city}</p>
                        </div>
                    </div>

                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>Street Address</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.streetAddress}</p>
                        </div>
                    </div>

                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>Street Address 2</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.streetAddress2}</p>
                        </div>
                    </div>

                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>Postal Code</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.postalCode}</p>
                        </div>
                    </div>

                    <div className="flex py-6 border-b border-gray-300">
                        <div className="w-64 font-semibold">
                            <p>Phone Number</p>
                        </div>
                        <div className="grow">
                            <p>{shippingAddress.phoneNumber}</p>
                        </div>
                    </div>

                    <div className="mt-4">
                    <Button onClick={() => {
                        loadCountries().then(() => setEditing(true))
                        resetForm()
                    }}
                        variant="contained" endIcon={<EditIcon/>}>
                    Edit</Button>
                    </div>
                </div>
            }

            {editing &&
            <form onSubmit={handleSubmit((data) => {
                if(editing) updateAddress(data);
            })}>
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Country</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                        <Select
                        value={watchCountry}
                        label="Country"
                        {...register('countryId')}>
                            {countries.map((country, index) => {
                                return <MenuItem key={index} value={country.id}>{country.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </div>
                </div>

                {/* CITY */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>City</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchCity}
                        label="City"
                        variant="filled"
                        {...register('city')}/>
                    </FormControl>
                    </div>
                </div>

                {/* STATE */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>State</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchState}
                        label="state"
                        variant="filled"
                        {...register('state')}/>
                    </FormControl>
                    </div>
                </div>

                {/* STREET ADDRESS */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Street Address</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchStreet}
                        label="Street Address"
                        variant="filled"
                        {...register('streetAddress')}/>
                    </FormControl>
                    </div>
                </div>

                {/* STREET ADDRESS 2 */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Street Address 2 (optional)</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchStreet2}
                        label="Street Address 2"
                        variant="filled"
                        {...register('streetAddress2')}/>
                    </FormControl>
                    </div>
                </div>

                {/* POSTAL CODE */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Postal Code</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchPostal}
                        label="Postal Code"
                        variant="filled"
                        {...register('postalCode')}/>
                    </FormControl>
                    </div>
                </div>

                {/* PHONE NUMBER */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Phone Number</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchPhone}
                        label="Phone Number"
                        variant="filled"
                        {...register('phoneNumber')}/>
                    </FormControl>
                    </div>
                </div>

                {/* FULL NAME */}
                <div className="flex py-3 border-b border-gray-300">
                    <div className="w-64 font-semibold">
                        <p>Full Name</p>
                    </div>
                    <div className="grow">
                    <FormControl variant="filled">
                        <TextField
                        value={watchFullName}
                        label="Full Name"
                        variant="filled"
                        {...register('fullName')}/>
                    </FormControl>
                    </div>
                </div>

                <div className="flex gap-2 my-4">
                    <Button type="submit"
                        variant="contained">
                    Apply Changes</Button>
                    <Button onClick={() => {
                        resetForm()
                        setEditing(false)}}
                        variant="contained" endIcon={<CancelIcon/>}>
                    Cancel</Button>
                </div>
            </form>
            }
        </div>
    );
}
