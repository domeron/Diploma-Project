import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { api_UserUpdate } from "../../API/UserAPI";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

export default function PersonalInformation() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [])

    return (
        <>
        <div className="pt-2 pb-4 mb-8 border-b border-gray-300">
            <p className="font-medium text-2xl">Personal Information</p>
        </div>
        <div className="mb-8">
            <InfoField fieldName={'profileImage'} fieldText={'Profile Image'} fieldValue={user.profileImagePath}/>
            <InfoField fieldName={'firstName'} fieldText={'First Name'} fieldValue={user.firstName}/>
            <InfoField fieldName={'lastName'} fieldText={'Last Name'} fieldValue={user.lastName}/>
            <InfoField fieldName={'email'} fieldText={'Email'} fieldValue={user.email}/>
            <InfoField fieldName={'phoneNumber'} fieldText={'Phone Number'} fieldValue={user.phoneNumber}/>
        </div>

        <div className="my-6 pb-6 border-b border-gray-300">
            <button className="py-1 px-4 text-blue-700 border border-blue-700 hover:text-white
            hover:bg-blue-700 transition-colors"
            onClick={() => {
                setUser(null)
                navigate('/')
            }}>
                Sign Out
            </button>
        </div>

        <div className="my-6">
            <button className="mb-4 py-1 px-4 text-red-700 border border-red-700 hover:text-white
            hover:bg-red-700 transition-colors"
            onClick={() => {
                setUser(null)
                navigate('/')
            }}>
                Delete Account
            </button>
            <p className="text-gray-500 text-sm">
                If you delete your account, you will no longer be able buy or sell products.
                You will still be able to discover products.
            </p>
        </div>
        </>
    );
}

function InfoField({fieldName, fieldValue, fieldText}) {
    const [editing, setEditing] = useState(false);
    const {user} = useContext(UserContext)

    return (
        <div className="flex pt-4 pb-6 border-b border-gray-300">
            <div className="w-64">
                <p>{fieldText}</p>
            </div>
            <div className="grow">
                {editing ?
                <div className="">
                    {fieldName === 'profileImage' ?
                    <ProfileImageForm setEditing={setEditing}/>
                    :
                    <FieldEditForm fieldName={fieldName} setEditing={setEditing}/>
                    }
                </div>
                :
                    (fieldName === 'profileImage' ?
                    
                        (fieldValue && <ProfileImage dimension={128} profileImagePath={user.profileImagePath}/>) 
                    :
                    <p className="italic">{fieldValue ? fieldValue : 'No Information'}</p>)
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
    const {user, setUser} = useContext(UserContext)
    const { register, handleSubmit, setValue, getValues,setError, formState: { errors } } = useForm();

    useEffect(() => {
        if(user !== null && user !== undefined)
            setValue(fieldName, user[fieldName])
    }, [])

    async function handleSaveEdit(data) {
        
        const formData = new FormData()
        formData.append(fieldName, getValues(fieldName))
        formData.append('userId', user.userId)
        
        await api_UserUpdate(formData)
        .then((response) => {
            console.log(response);
            setEditing(false);
            setUser(response)
        })
        .catch(err => {
            console.log(err)
            
            setError(fieldName, { type: 'custom', message: err.response.data });
            return;
        })
    }

    return (
        <form className="flex justify-between gap-4 w-100"
        onSubmit={handleSubmit(handleSaveEdit)}>
            <input className="p-1 grow border border-gray-300"
            type={  (fieldName === 'email' && 'email') ||
                    (fieldName === 'firstName' && 'text') ||
                    (fieldName === 'lastName' && 'text') ||
                    (fieldName === 'phoneNumber' && 'text')}
            {...register(fieldName, {required:'Please provide input'})}/>
            <ErrorMessage errors={errors} name={fieldName}
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <div className="flex gap-2">
                <button 
                className="w-24 py-1 px-2 bg-blue-500 text-white hover:bg-blue-800"
                type="submit" >Save</button>
                <button 
                className="w-24 py-1 px-2 text-blue-500 border-blue-500 border hover:text-white hover:bg-blue-800"
                onClick={() => setEditing(false)}
                type="button" >Cancel</button>
            </div>
        </form>
    )
}

function ProfileImageForm({setEditing}) {
    const {user, setUser} = useContext(UserContext)
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    async function handleSubmitImage(data) {
        const formData = new FormData()
        formData.append("profileImage", data.profileImage[0])
        formData.append("userId", user.userId)

        api_UserUpdate(formData)
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