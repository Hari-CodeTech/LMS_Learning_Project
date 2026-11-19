
import { Link } from "react-router-dom";

function Hero() {

    return (

        <section className="hero">

            <div className="hero-content">

                <h1>
                    Learn. Grow. <span>Achieve.</span>
                </h1>

                <p>
                    Welcome to our Learning Management System.
                    Explore courses, improve your skills, track
                    your progress and achieve your learning goals.
                </p>

                <div className="hero-buttons">

                    <Link to="/login" className="get-started-btn">
                        Get Started
                    </Link>

                    <Link to="/courses" className="explore-btn">
                        Explore Courses
                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Hero;
