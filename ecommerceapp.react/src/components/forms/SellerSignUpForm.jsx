import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { UserContext } from "../../App";
import { api_CreateSeller } from "../../API/SellerAPI";

export default function SellerSignUpForm({setSigningUp, loadSeller}) {
    const {user, setUser} = useContext(UserContext)
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
            setUser(responseData)
            loadSeller()
        })
        .catch(err => console.log(err.response))
    }

    return (
        <form className="flex flex-col items-start"
        onSubmit={handleSubmit(handleSignUpSeller)}>

            <div className="mb-4 w-1/2">
                <p className="mb-2">Seller Name</p>
                <input type="text" 
                className="py-1 px-2 w-full outline-none border border-gray-500"
                {...register('sellerName', {required: 'Please, enter Seller Name'})}/>
                <ErrorMessage errors={errors} name="sellerName"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="mb-4 w-1/2">
                <p className="mb-2">Seller Email</p>
                <input type="email"
                className="py-1 px-2 w-full outline-none border border-gray-500"
                {...register('sellerEmail', {required: 'Please, enter Seller Email'})}/>
                <ErrorMessage errors={errors} name="sellerEmail"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="mb-4">
                <div className="flex gap-2 items-center mb-2">
                    <input type="checkbox" value={watchIsIndividual}
                    className="p-2"
                    {...register('isIndividual')}/>
                    <p className="">Is Individual</p>
                </div>
            </div>

            <div className="mb-4 w-full">
                <p className="mb-2">Seller Description (optional)</p>
                <textarea 
                className="py-1 px-2 w-full h-32 outline-none border border-gray-500 resize-none"
                {...register('sellerDescription')}/>
                <ErrorMessage errors={errors} name="sellerDescription"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <button className="py-2 px-4 bg-blue-500 text-white">
                Submit
            </button>
        </form>
    )
}