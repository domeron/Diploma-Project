import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { api_UpdateUser} from "../../api/user_api";
import ProfileImage from "../elements/ProfileImage";
import useUser from "../../hooks/useUser";

export default function PersonalInformation() {
    const {user} = useContext(UserContext)

    useEffect(() => {
        console.log('Personal information useEffect')
    }, [])

    return (
        <div className="px-8 pt-4 pb-16 text-sm">
            <div className="py-4 mb-8 border-b border-gray-300">
                <p className="text-2xl font-semibold">Personal Information</p>
            </div>
            <div>
                <InfoField fieldName={'profileImage'} fieldText={'Profile Image'} fieldValue={user.profileImagePath}/>
                <InfoField fieldName={'firstName'} fieldText={'First Name'} fieldValue={user.firstName}/>
                <InfoField fieldName={'lastName'} fieldText={'Last Name'} fieldValue={user.lastName}/>
                <InfoField fieldName={'email'} fieldText={'Email'} fieldValue={user.email}/>
                <InfoField fieldName={'phoneNumber'} fieldText={'Phone Number'} fieldValue={user.phoneNumber}/>
            </div>
        </div>
    );
}

function InfoField({fieldName, fieldValue, fieldText}) {
    const [editing, setEditing] = useState(false);

    return (
        <div className="flex py-6 border-b border-gray-300">
            <div className="w-64 font-semibold">
                <p>{fieldText}</p>
            </div>
            <div className="grow">
                {editing ?
                <div className="max-w-xs">
                    {fieldName === 'profileImage' ?
                    <ProfileImageForm setEditing={setEditing}/>
                    :
                    <FieldEditForm fieldName={fieldName} setEditing={setEditing}/>
                    }
                </div>
                :
                    (fieldName === 'profileImage' ?
                        (fieldValue && <ProfileImage dimension={48} url={fieldValue}/>)
                    :
                    <p>{fieldValue ? fieldValue : 'No Information'}</p>)
                }
            </div>

            {!editing &&
                <div className="w-32 flex justify-end">
                    <p className="hover:text-blue-500 cursor-pointer"
                    onClick={() => setEditing(true)}
                    >Edit</p>
                </div>
            }
        </div>
    );

}
function FieldEditForm({fieldName, setEditing}) {
    const {user, setUser} = useUser()
    const { register, handleSubmit, setValue, getValues,setError, formState: { errors } } = useForm();

    useEffect(() => {
        console.log('FieldEditForm userEffect')
        if(user !== null && user !== undefined)
            setValue(fieldName, user[fieldName])
    }, [])

    async function handleSaveEdit(data) {
        console.log(data);
        const formData = new FormData()
        formData.append(fieldName, getValues(fieldName))
        await api_UpdateUser(user.userId, formData)
        .then((response) => {
            console.log(response);
            setEditing(false);
            setUser(response)
        })
        .catch(err => {
            console.log(err)
            if(err.response.data === 'User with provided email already exists.')
                setError(fieldName, { type: 'custom', message: err.response.data });
            return;
        })
    }

    return (
        <form className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSaveEdit)}>
            <input className="border border-gray-300"
            type={  fieldName === 'email' && 'email' ||
                    fieldName === 'firstName' && 'text' ||
                    fieldName === 'lastName' && 'text' ||
                    fieldName === 'phoneNumber' && 'text'}
            {...register(fieldName, {required:'Please provide input'})}/>
            <ErrorMessage errors={errors} name={fieldName}
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <div className="flex gap-2">
                <button 
                className="w-32 py-2 px-2 bg-blue-500 text-white"
                type="submit" >Save</button>
                <button 
                className="w-32 py-2 px-2 text-blue-500 border-blue-500 border"
                onClick={() => setEditing(false)}
                type="button" >Cancel</button>
            </div>
        </form>
    )
}

function ProfileImageForm({setEditing}) {
    const {user, setUser} = useUser()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    async function handleSubmitImage(data) {
        const formData = new FormData()
        formData.append("profileImage", data.profileImage[0])

        api_UpdateUser(user.userId, formData)
        .then((response) => {
            console.log(response)
            setEditing(false)
            setUser(response);
        })
        .catch(err => console.log(err))
    }

    return (
        <form className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitImage)}>
            <input className="border border-gray-300"
            type="file"
            {...register('profileImage', {required:'Please provide input file'})}/>
            <ErrorMessage errors={errors} name={'profileImage'}
            render={({ message }) => <p className="text-red-500">{message}</p>}/>
            
            <div className="flex gap-2">
                <button 
                className="w-32 py-2 px-2 bg-blue-500 text-white"
                type="submit" >Save</button>
                <button 
                className="w-32 py-2 px-2 text-blue-500 border-blue-500 border"
                onClick={() => setEditing(false)}
                type="button" >Cancel</button>
            </div>
        </form>
    );
}