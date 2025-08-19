import { useKeycloak } from "@react-keycloak/web";
import { Link, useNavigate } from "react-router";

const NavBar = () => {
    const { keycloak } = useKeycloak();
    const logout = () => {
        keycloak.logout({
            redirectUri: window.location.origin,
        });
    }

    return (
        <div className="bg-gray-900 text-white flex justify-between items-center px-4 py-2">
            <h1 className="text-4xl">Customer store</h1>
            <ul className="flex gap-2">
                <li className=""><Link to='/' className="px-4 py-2 cursor-pointer"
                >Home</Link></li>
                <li className=""><Link to='/customer' className="px-4 py-2  cursor-pointer">Customer</Link></li>
            </ul>
            <div>
                <button onClick={logout} className="bg-red-700 flex items-center px-4 py-2 rounded-md hover:bg-red-400 cursor-pointer">Logout</button>
            </div>
        </div>
    )
}

export default NavBar;