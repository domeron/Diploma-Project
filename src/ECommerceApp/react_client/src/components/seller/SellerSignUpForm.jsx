import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { UserContext } from "../../App";
import { api_CreateSeller } from "../../api/seller_api";
import useRefreshUser from "../../hooks/useUser";

export default function SellerSignUpForm({setSigningUp}) {
    const refreshUser = useRefreshUser();
    const {user} = useContext(UserContext)
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
        defaultValues: {
            sellerEmail: user.email,
            sellerName: user.firstName,
            userId: user.userId,
            isIndividual: true
        }
    });
    const watchIsIndividual = watch('isIndividual')

    async function handleSignUpSeller(data) {
        console.log(data)
        await api_CreateSeller(data)
        .then((responseData) => {
            console.log(responseData)
            setSigningUp(false)
            refreshUser();
        })
        .catch(err => console.log(err.response))
    }

    return (
        <form className="max-w-xs"
        onSubmit={handleSubmit(handleSignUpSeller)}>
            <div className="my-4">
                <p className="mb-2">Seller Name</p>
                <input type="text" 
                className="py-1 px-2 w-full rounded-md border border-gray-500"
                {...register('sellerName', {required: 'Please, enter Seller Name'})}/>
                <ErrorMessage errors={errors} name="sellerName"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-4">
                <p className="mb-2">Seller Email</p>
                <input type="email"
                className="py-1 px-2 w-full rounded-md border border-gray-500"
                {...register('sellerEmail', {required: 'Please, enter Seller Email'})}/>
                <ErrorMessage errors={errors} name="sellerEmail"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-4">
                <div className="flex gap-2 items-center mb-2">
                    <input type="checkbox" value={watchIsIndividual}
                    className="p-2"
                    {...register('isIndividual')}/>
                    <p className="">Is Individual</p>
                </div>
            </div>

            <div className="my-4">
                <p className="mb-2">Seller Description (optional)</p>
                <textarea 
                className="py-1 px-2 w-full h-32 rounded-md border border-gray-500"
                {...register('sellerDescription')}/>
                <ErrorMessage errors={errors} name="sellerDescription"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <button className="py-2 px-4 bg-blue-500 text-white rounded-md">
                Submit
            </button>
        </form>
    )
}