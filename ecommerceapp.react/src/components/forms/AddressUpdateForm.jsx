import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { api_GetCountries } from "../../API/CountryAPI";
import { ErrorMessage } from "@hookform/error-message";
import { api_CreateShippingAddress, api_UpdateShippingAddress } from "../../API/UserAPI";

export default function AddressUpdateForm({onUpdate, address}) {
    const {user} = useContext(UserContext)
    const [countries, setCountries] = useState([])
    const { register, handleSubmit, setValue, watch, getValues,setError, formState: { errors } } = useForm({
        defaultValues: {
            addressId: address.id,
            countryId: address.countryId,
            state: address.state,
            city: address.city,
            postalCode: address.postalCode,
            streetAddress: address.streetAddress,
            streetAddress2: address.streetAddress2,
            fullName: address.fullName,
            phoneNumber: address.phoneNumber
        }
    });

    const watchCountryId = watch('countryId')

    useEffect(() => {
        loadCountries();
        if(user != null)
            setValue('userId', user.userId)
        console.log(watchCountryId)
    }, [])

    async function loadCountries() {
        await api_GetCountries()
        .then((data) => {
            setCountries(data)
        })
        .catch(err => console.log(err.response))
    }

    async function handleUpdateAddress(data) {
        console.log(data)
        await api_UpdateShippingAddress(data)
        .then((data) => {
            console.log(data)
            onUpdate()
        })
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit(handleUpdateAddress)}>
            <div className="my-4">
                <p className="text-gray-800 mb-2">Country</p>
                <select value={watchCountryId}
                className="py-2 px-2 bg-white rounded-sm border border-gray-500"
                {...register('countryId', {required: "Please choose a country"})}>
                    <option className="py-1 px-2" value="">Choose Country</option>

                    {countries.map((country, index) => {
                        return <option className="py-1 px-2"
                        value={country.id} key={index}>{country.name}</option>
                    })}
                </select>
                <ErrorMessage errors={errors} name={'countryId'}
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            {/* FULL NAME */}
            <div className="my-4">
                <p className="text-gray-800 mb-2">Full Name</p>
                <input className="py-1 px-2 bg-white rounded-sm border border-gray-500"
                {...register('fullName', 
                {required: 'Please Provide Full Name'})}/>
                <ErrorMessage errors={errors} name={'fullName'}
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            {/* STREET ADDRESS */}
            <div className="flex flex-row my-4 gap-8">
                <div className="w-1/2">
                    <p className="text-gray-800 mb-2">Street Address</p>
                    <input className="w-full py-1 px-2 bg-white rounded-sm border border-gray-500"
                    {...register('streetAddress', 
                    {required: 'Please Provide Street Address'})}/>
                    <ErrorMessage errors={errors} name={'streetAddress'}
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>
                <div className="w-1/2">
                    <p className="text-gray-800 mb-2">Street Address 2 (optional)</p>
                    <input className="w-full py-1 px-2 bg-white rounded-sm border border-gray-500"
                    {...register('streetAddress2')}/>
                    <ErrorMessage errors={errors} name={'streetAddress2'}
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>
            </div>

            {/* CITY, STATE, POSTAL CODE */}
            <div className="flex flex-row my-4 gap-6">
                <div className="">
                    <p className="text-gray-800 mb-2">City</p>
                    <input className="w-full py-1 px-2 bg-white rounded-sm border border-gray-500"
                    {...register('city', 
                    {required: 'Please Provide City Name'})}/>
                    <ErrorMessage errors={errors} name={'city'}
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>

                <div className="">
                    <p className="text-gray-800 mb-2">State</p>
                    <input className="w-full py-1 px-2 bg-white rounded-sm border border-gray-500"
                    {...register('state', 
                    {required: 'Please Provide State Name'})}/>
                    <ErrorMessage errors={errors} name={'state'}
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>

                <div className="">
                    <p className="text-gray-800 mb-2">Postal Code</p>
                    <input className="w-full py-1 px-2 bg-white rounded-sm border border-gray-500"
                    {...register('postalCode', 
                    {required: 'Please Provide Postal Code'})}/>
                    <ErrorMessage errors={errors} name={'postalCode'}
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>
            </div>

            <div className="my-4">
                <p className="text-gray-800 mb-2">Phone Number</p>
                <input className="py-1 px-2 bg-white rounded-sm border border-gray-500"
                {...register('phoneNumber', 
                {required: 'Please Provide Phone Number'})}/>
                <ErrorMessage errors={errors} name={'phoneNumber'}
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="flex gap-4">
                <button className="py-2 px-4 mb-4 bg-blue-500 text-white"    
                type="submit">Update Address</button>
            </div>
        </form>
    );
}