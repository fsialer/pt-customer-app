import { useState } from "react";
import { useNavigate } from "react-router";
import Confirm from "../../../Confirm";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CustomerProps {
    id: string;
    name: string;
    lastName: string;
    age: number;
    birthDate: string;
    onLoadCustomer: any;
    handleDownloadFile: any;
}

const CustomerCard = ({ id, name, lastName, age, birthDate, onLoadCustomer, handleDownloadFile }: CustomerProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate()

    const handleDeleteClick = () => {
        setShowConfirm(true); // mostramos el modal
    }

    const handleConfirmDelete = () => {
        onLoadCustomer(id); // eliminamos
        setShowConfirm(false); // cerramos modal
    }

    const handleCancelDelete = () => {
        setShowConfirm(false); // solo cerramos modal
    }

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split("T")[0].split("-");
        const months = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];
        return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
    };

    const getCustomerFile = (id: string) => {
        return handleDownloadFile(id)
    }

    return (
        <>
            <div className="bg-gray-800 relative flex flex-col px-4 py-2 rounded-md shadow-2xl gap-2 w-[250px] h-[300px]">
                <button
                    className="absolute top-2 right-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-400 cursor-pointer"
                    onClick={() => getCustomerFile(id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="m21.8 6.4-2.7-3.6c-.38-.5-.97-.8-1.6-.8h-11c-.63 0-1.23.3-1.6.8L2.2 6.4h.01c-.13.18-.21.37-.21.6v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-.23-.09-.42-.21-.59h.01ZM6.5 4h11L19 6H5zM4 20V8h16v12z"></path><path d="M13 10h-2v4H8l4 4 4-4h-3z"></path>
                    </svg>
                </button>
                <div className="mt-8">
                    <p className="font-bold">Name: <span className="font-thin text-blue-400 italic ml-1">{name || <Skeleton width={160}></Skeleton>}</span></p>
                    <p className="font-bold">Lastname: <span className="font-thin text-blue-400 italic ml-1">{lastName || <Skeleton width={130}></Skeleton>}</span></p>
                    <p className="font-bold">Age: <span className="font-thin text-blue-400 italic ml-1">{age || <Skeleton width={20}></Skeleton>}</span></p>
                    <p className="font-bold">BirthDate: <span className="font-thin text-blue-400 italic ml-1">{birthDate ? formatDate(birthDate) : <Skeleton width={130}></Skeleton>}</span></p>
                </div>

                <div className="flex flex-col  gap-2 mt-auto">
                    <button className="bg-yellow-400 px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-200/90" onClick={() => navigate(`/edit-customer/${id}`)}>Edit</button>
                    <button className="bg-red-400 px-4 py-2 rounded-md cursor-pointer hover:bg-red-200/90" onClick={() => handleDeleteClick()}>Delete</button>
                </div>

            </div>

            {
                showConfirm && (
                    <Confirm
                        handleConfirmDelete={handleConfirmDelete}
                        handleCancelDelete={handleCancelDelete}
                        message={`¿Estas seguro de querer eliminar al cliente ${name}?`}
                    />
                )
            }
        </>

    )
}

export default CustomerCard;
