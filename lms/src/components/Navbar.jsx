function Navbar() {

    return (

        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                LMS Portal
            </div>

            {/* Navigation Links */}
            <div className="nav-links">

                <a href="/">Home</a>
                <a href="#courses">Courses</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>

            </div>

            {/* Authentication Buttons */}
            <div className="nav-buttons">

                <button className="login-btn">Login</button>

                <button className="register-btn">Register</button>

            </div>

        </nav>

    );

}

export default Navbar;