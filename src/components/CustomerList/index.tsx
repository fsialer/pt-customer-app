import { useEffect } from "react";
import useCustomerDelete from "../../hooks/useCustomerDelete";
import CustomerCard from "./components/CustomerCard";
import ReactPaginate from "react-paginate";
import useConsumerDownload from "../../hooks/useConsumerDownload";
import { useNotification } from "../../utils/NotificationContext";
import useCustomersDataPaginated from "../../hooks/useCustomerDataPaginated";
import { useSearchParams } from "react-router";


const CustomerList = () => {
  const {
    customers,
    total,
    isLoading,
    error,
    fetchCustomers
  } = useCustomersDataPaginated();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // por defecto 1
  const customersPerPage = parseInt(searchParams.get("size") || "12", 10); // por defecto 12
  const { deleteCustomer } = useCustomerDelete();
  const { fetchImage, error: errorDownload } = useConsumerDownload();
  const { showNotification } = useNotification();

  // ✅ Cuando cambie la página, llama al fetch
  useEffect(() => {
    fetchCustomers({ page: currentPage, size: customersPerPage });
  }, [currentPage, customersPerPage]);

  const handleDeleteCustomer = async (id: string) => {
    await deleteCustomer(id);
    showNotification({
      message: "Customer deleted correctly",
      type: "info",
    });
    fetchCustomers({ page: currentPage, size: customersPerPage }); // vuelve a cargar la página actual
  };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setSearchParams({ page: newPage.toString(), size: customersPerPage.toString() });
  };

  const handleDownload = async (id: string) => {
    await fetchImage({ id });
    if (errorDownload) {
      showNotification({
        message: "Ups an error occurred downloading the file.",
        type: "error",
      });
    }
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <ReactPaginate
        previousLabel={"⬅ Previous"}
        nextLabel={"Next ➡"}
        breakLabel={"..."}
        pageCount={Math.ceil(total / customersPerPage)}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName="flex gap-2 cursor-pointer"
        pageClassName="flex justify-center items-center px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
        activeClassName="bg-blue-600 text-white"
        previousClassName="px-3 py-1 rounded bg-gray-700 "
        nextClassName="px-3 py-1 rounded bg-gray-700 "
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );

  if (isLoading) return <div>
    <CustomerCard
      key={""}
      id={""}
      name={""}
      lastName={""}
      age={0}
      birthDate={""}
      onLoadCustomer={handleDeleteCustomer}
      handleDownloadFile={handleDownload}
    />
  </div>;
  if (error) {
    return (
      <div className="text-center">
        <h1 className="bg-red-500 text-white">Error: {error.message}</h1>
      </div>
    )
  }

  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-evenly items-center gap-4 px-2">
        {customers.length === 0 ? (
          <p>Empty</p>
        ) : (
          customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              id={customer.id}
              name={customer.name}
              lastName={customer.lastName}
              age={customer.age}
              birthDate={customer.birthDate}
              onLoadCustomer={handleDeleteCustomer}
              handleDownloadFile={handleDownload}
            />
          ))
        )}
      </div>
      {total > customersPerPage && renderPagination()}
    </div>
  );
};

export default CustomerList;