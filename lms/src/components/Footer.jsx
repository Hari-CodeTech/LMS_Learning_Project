function Footer() {

    return (

        <footer className="footer" id="contact">

            <div className="footer-container">

                {/* Application Information */}

                <div className="footer-about">

                    <h2>LMS Portal</h2>

                    <p>
                        Learn. Grow. Achieve.

                        Your learning journey starts with us.
                    </p>

                </div>


                {/* Quick Links */}

                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <a href="/">Home</a>

                    <a href="#courses">Courses</a>

                    <a href="#about">About</a>

                    <a href="#contact">Contact</a>

                </div>


                {/* Contact Information */}

                <div className="footer-contact">

                    <h3>Contact Us</h3>

                    <p>Email: support@lmsportal.com</p>

                    <p>Phone: +91 9876543210</p>

                    <p>Location: India</p>

                </div>

            </div>


            {/* Copyright */}

            <div className="footer-bottom">

                <p>
                    © 2026 LMS Portal. All Rights Reserved.
                </p>

            </div>

        </footer>

    );

}

export default Footer;