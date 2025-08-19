import { useEffect, useState } from "react";
import useCustomersData from "../../hooks/useCustomersData";
import useCustomerDelete from "../../hooks/useCustomerDelete";
import CustomerCard from "./components/CustomerCard";
import ReactPaginate from "react-paginate";


const CustomerList = () => {
    const { customers: initialCustomers, isLoading, error } = useCustomersData();
    const { deleteCustomer } = useCustomerDelete();
    const [customers, setCustomers] = useState(initialCustomers);
    // 🔹 Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const customersPerPage = 14; // cantidad de registros por página

    useEffect(() => {
        setCustomers(initialCustomers);
    }, [initialCustomers]);

    const handleDeleteCustomer = (id: string) => {
        deleteCustomer(id)
        setCustomers((prev) => prev.filter((c) => c.id !== id)); // 👈 borra localmente
    }

    // 🔹 Cálculo de paginación
    const indexOfLast = currentPage * customersPerPage;
    //const indexOfFirst = indexOfLast - customersPerPage;
    const currentCustomers = customers.slice(indexOfLast, indexOfLast + customersPerPage);
    const totalPages = Math.ceil(customers.length / customersPerPage);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const renderPagination = () => (
        <div className="flex justify-center items-center gap-2 mt-6">
            <ReactPaginate
                previousLabel={"⬅ Previous"}
                nextLabel={"Next ➡"}
                breakLabel={"..."}
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName="flex gap-2 cursor-pointer"
                pageClassName="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                activeClassName="bg-blue-600 text-white"
                previousClassName="px-3 py-1 rounded bg-gray-700 "
                nextClassName="px-3 py-1 rounded bg-gray-700 "
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );

    const render = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (error) {
            return <div>ocurred error: {error.message}</div>
        }
        return (
            <div className="text-white">
                <div className="flex flex-wrap justify-evenly items-center gap-4 px-2">
                    {
                        currentCustomers.length === 0 ? (<p>Empty</p>) : (currentCustomers.map((customer, index) => (
                            <CustomerCard key={customer.id}
                                id={customer.id}
                                name={customer.name}
                                lastName={customer.lastName}
                                age={customer.age}
                                birthDate={customer.birthDate}
                                onLoadCustomer={handleDeleteCustomer}
                            />)
                        ))}
                </div>
                {customers.length > customersPerPage && renderPagination()}
            </div>
        )
    }

    return (
        <>
            {render()}
        </>
    )
}

export default CustomerList