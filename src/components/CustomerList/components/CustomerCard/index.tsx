import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Confirm from "../../../Confirm";

interface CustomerProps {
    id: string;
    name: string;
    lastName: string;
    age: number;
    birthDate: string;
    onLoadCustomer: any
}

const CustomerCard = ({ id, name, lastName, age, birthDate, onLoadCustomer }: CustomerProps) => {
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
        const date = new Date(dateString);
        return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
    };

    return (
        <>
            <div className="bg-gray-800 relative flex flex-col px-4 py-2 rounded-md shadow-2xl gap-2 w-[250px] h-[300px]">
                <button
                    className="absolute top-2 right-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-400 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="m21.8 6.4-2.7-3.6c-.38-.5-.97-.8-1.6-.8h-11c-.63 0-1.23.3-1.6.8L2.2 6.4h.01c-.13.18-.21.37-.21.6v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-.23-.09-.42-.21-.59h.01ZM6.5 4h11L19 6H5zM4 20V8h16v12z"></path><path d="M13 10h-2v4H8l4 4 4-4h-3z"></path>
                    </svg>
                </button>
                <div className="mt-8">
                    <p className="font-bold">Name: <span className="font-thin text-blue-400 italic ml-1">{name}</span></p>
                    <p className="font-bold">Lastname: <span className="font-thin text-blue-400 italic ml-1">{lastName}</span></p>
                    <p className="font-bold">Age: <span className="font-thin text-blue-400 italic ml-1">{age}</span></p>
                    <p className="font-bold">BirthDate: <span className="font-thin text-blue-400 italic ml-1">{formatDate(birthDate)}</span></p>
                </div>

                <div className="flex flex-col  gap-2 mt-auto">
                    <button className="bg-yellow-400 px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-200/90" onClick={() => navigate(`/edit-customer/${id}`)}>Edit</button>
                    <button className="bg-red-400 px-4 py-2 rounded-md cursor-pointer hover:bg-red-200/90" onClick={() => handleDeleteClick(id)}>Delete</button>
                </div>

            </div>

            {
                showConfirm && (
                    <Confirm
                        handleConfirmDelete={handleConfirmDelete}
                        handleCancelDelete={handleCancelDelete}
                        message={`¿Estas seguro de querer eliminar al cliente ${name}?`}
                    />
                    // <div style={{
                    //     position: "fixed",
                    //     top: 0, left: 0, right: 0, bottom: 0,
                    //     backgroundColor: "rgba(0,0,0,0.5)",
                    //     display: "flex",
                    //     justifyContent: "center",
                    //     alignItems: "center",
                    //     zIndex: 1000
                    // }}>
                    //     <div style={{
                    //         background: "white",
                    //         padding: "20px",
                    //         borderRadius: "8px",
                    //         textAlign: "center",
                    //         minWidth: "300px"
                    //     }}>
                    //         <p>¿Estás seguro de que deseas eliminar este cliente?</p>
                    //         <button onClick={handleConfirmDelete} style={{ marginRight: "10px" }}>Sí</button>
                    //         <button onClick={handleCancelDelete}>Cancelar</button>
                    //     </div>
                    // </div>
                )
            }
        </>

    )
}

export default CustomerCard;
