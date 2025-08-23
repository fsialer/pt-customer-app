import { useNavigate } from "react-router";
import CustomerList from "../../components/CustomerList";
import NavBar from "../../components/NavBar/Index";

const Customer = () => {
    const navigate = useNavigate()
    return (
        <>
            <NavBar></NavBar>
            <div className="py-6">
                <div className=" text-white text-center flex flex-col justify-center items-center py-4">
                    <h1 className="text-5xl">List Customers</h1>
                </div>
                <div className="text-white flex flex-col justify-center items-center py-4">
                    <button onClick={() => navigate('/create-customer')} className="bg-green-700 flex items-center px-4 py-2 rounded-md hover:bg-green-400 cursor-pointer text-center">Create Customer</button>
                </div>
                <CustomerList />
            </div>

        </>

    )
}

export default Customer;