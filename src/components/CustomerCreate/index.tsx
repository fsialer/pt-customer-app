import { useForm } from "react-hook-form";
import CustomerForm from "./components/CustomerForm";
import useCustomerSave from "../../hooks/useCustomerSave";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import useCustomerData from "../../hooks/useCustomerData";
import NavBar from "../NavBar/Index";
import { useNotification } from "../../utils/NotificationContext";
import type { ICustomer } from "../../models/customer.interface";


type RouteParams = {
    id?: string; // opcional porque puede no estar
};

const CustomerCreate = () => {

    const { id: idParam } = useParams<RouteParams>(); // <-- obtiene el id si existe
    const id = idParam ?? null;
    const { customer, error } = useCustomerData({ id });
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm({ mode: "onChange" })
    const { saveCustomer, errorSave } = useCustomerSave();
    const { showNotification } = useNotification();


    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            reset(customer);
        }
    }, [customer, reset])



    const handleClearClick = () => {
        reset();
    }

    const handleBackClick = () => {
        navigate("/customer")
    }

    const handleFormSubmit = async (data: ICustomer) => {
        const resp = await saveCustomer(data)
        if (!resp?.message) {
            showNotification({
                message: id ? "Customer updated correctly" : "Customer saved correctly.",
                type: "success",
            });
            navigate("/customer")
        }
    }

    if (error) {
        return (<><p>Error cargando cliente: {error.message}</p> <button onClick={handleBackClick}>Back</button></>);
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="flex flex-col items-center justify-center h-screen gap-4">

                <CustomerForm
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={handleFormSubmit}
                    errors={errors}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                ></CustomerForm>
                {errorSave && <p>{errorSave.message}</p>}
                <div className="flex gap-2">
                    <button onClick={handleClearClick} className="bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600/90" >Clear</button>
                    <button onClick={handleBackClick} className="bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600/90" >Back</button>
                </div>

            </div>
        </>

    )
}

export default CustomerCreate;
