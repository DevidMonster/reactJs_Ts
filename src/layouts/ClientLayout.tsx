import { Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

function ClientLayout() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div>
            <header style={{ display: 'flex', justifyContent: "space-between", padding: "0px 20px" }}>
                {localStorage.getItem('token') !== null ? (
                    <Button onClick={handleLogout}>Logout</Button>
                ) : (
                    <div>
                        <Button onClick={() => navigate('/login')}>Login</Button>
                        <Button onClick={() => navigate('/register')}>Register</Button>
                    </div>
                )}
                <nav>
                    <ul style={{ display: 'flex', gap: "10px", justifyContent: 'center', listStyle: "none" }}>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/products'>Products</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="banner">

            </div>
            <main>
                <Outlet />
            </main>
            <footer>
                DevidMonster
            </footer>
        </div>
    );
}

export default ClientLayout;