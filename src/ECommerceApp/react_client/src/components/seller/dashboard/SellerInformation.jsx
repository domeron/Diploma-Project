import {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { api_GetSellerById, api_UpdateSeller } from "../../../api/seller_api";
import { UserContext } from "../../../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { SellerContext } from '../../../pages/SellerDashboard';

export default function SellerInformation() {
    const {user} = useContext(UserContext)
    const {seller, setSeller} = useContext(SellerContext);

    return (
        <div className="px-8 pt-4 pb-16 text-sm">
            <div className="py-4 mb-6 border-b border-gray-300">
                <p className="text-2xl font-semibold">Seller Information</p>
            </div>
            {seller &&
            <div>
                <InfoField fieldName={'sellerName'} fieldValue={seller.sellerName}>
                    <p>Name</p>
                </InfoField>
                <InfoField fieldName={'sellerEmail'} fieldValue={seller.sellerEmail}>
                    <p>E-mail</p>
                </InfoField>
                <InfoField fieldName={'sellerDescription'} fieldValue={seller.sellerDescription}>    
                    <p>Description</p>
                </InfoField>
            </div>
            }
        </div>
    );
}

function InfoField(props) {
    const [editing, setEditing] = useState(false);
    
    return (
        <div className="flex py-6 border-b border-gray-300">
            <div className="w-64 font-semibold">
                {props.children}
            </div>
            <div className="grow">
                {editing ?
                    <FieldEditForm fieldName={props.fieldName} setEditing={setEditing}/>
                :
                    <p>{props.fieldValue ? props.fieldValue : 'No Information'}</p>
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
    const {seller, setSeller} = useContext(SellerContext)
    const { register, handleSubmit, setValue, getValues,setError, formState: { errors } } = useForm();

    useEffect(() => {
        if(seller !== null || seller !== undefined)
            setValue(fieldName, seller[fieldName])
    }, [])

    async function handleSaveEdit(data) {
        await api_UpdateSeller(seller.sellerId, data)
        .then((dataResponse) => {
            setSeller(dataResponse)
            setEditing(false)
        })
        .catch(err => console.log(err.response))
    }

    return (
        <form className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSaveEdit)}>
            {fieldName === 'sellerDescription' &&
                <textarea className="px-2 py-1 border border-gray-400 rounded"
                {...register(fieldName)}/>
            }

            {(fieldName === 'sellerName' || fieldName === 'sellerEmail') &&
                <input className="px-2 py-1 border border-gray-400 rounded"
                type={  fieldName === 'sellerName' && 'text' ||
                        fieldName === 'sellerEmail' && 'email'}
                {...register(fieldName, {required:'Please provide input'})}/>
            }

            <ErrorMessage errors={errors} name={fieldName}
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <div className="flex gap-2">
                <button 
                className="w-32 py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                type="submit" >Save</button>
                <button 
                className="w-32 py-2 px-2 text-blue-500 border-blue-500 border rounded hover:bg-gray-200"
                onClick={() => setEditing(false)}
                type="button" >Cancel</button>
            </div>
        </form>
    );
}