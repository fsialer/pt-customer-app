interface ConfirmProps {
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
    message: string
}

const Confirm: React.FC<ConfirmProps> = ({ handleConfirmDelete, handleCancelDelete, message }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <div className="bg-white p-5 rounded-lg text-center min-w-[300px]">
                <p className="text-gray-900 mb-4">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleConfirmDelete}
                        className="bg-green-600 px-4 py-2 rounded-md cursor-pointer hover:bg-green-500"
                    >
                        Sí
                    </button>
                    <button
                        onClick={handleCancelDelete}
                        className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-500"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm