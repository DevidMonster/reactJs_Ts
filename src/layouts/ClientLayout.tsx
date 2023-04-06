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
            <header style={{ borderBottom: "1px solid black", display: 'flex', justifyContent: "space-between", padding: "0px 20px", alignItems: "center" }}>
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
                        <li><Button type="link"><Link to='/'>Home</Link></Button></li>
                        <li><Button type="link"><Link to='/products'>Products</Link></Button></li>
                    </ul>
                </nav>
            </header>
            <div className="banner" style={{ width: "100%", height: "400px" }}>
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://thumbs.dreamstime.com/z/creating-fashion-t-shirt-banner-mockup-template-creating-fashion-t-shirt-banner-mockup-template-vector-illustration-white-164425877.jpg" alt="banner" />
            </div>
            <main style={{ minHeight: "100vh" }}>
                <Outlet />
            </main>
            <footer>
                <p style={{ textAlign: "center" }}>Copyright © 2000-2023 DevidMonster. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ClientLayout;