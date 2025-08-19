
interface CustomerFormProps {
    register: any;
    handleSubmit: any;
    onSubmit: any;
    errors: any;
    isValid: any;
    isSubmitting: any;
}

const CustomerForm = ({ register, handleSubmit, onSubmit, errors, isValid, isSubmitting }: CustomerFormProps) => {
    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Customer Form</h1>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1 font-semibold">Name</label>
                    <input type="text" {...register("name", { required: "Name is required" })}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="flex flex-col">LastName</label>
                    <input type="text" {...register("lastName", { required: "Last Name is required" })}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="flex flex-col">Age</label>
                    <input type="number" {...register("age", { valueAsNumber: true, min: 0 })}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="flex flex-col">BirthDate</label>
                    <input type="date" {...register("birthDate", { required: "Birth Date is required" })}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.birthDate && <p>{errors.birthDate.message}</p>}
                </div>
                <button type="submit" disabled={!isValid || isSubmitting} className={`w-full py-2 rounded-md font-semibold transition-colors cursor-pointer ${isValid
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}> {isSubmitting ? "Saving..." : "Save"}</button>
            </form>


        </div>
    )
}

export default CustomerForm;