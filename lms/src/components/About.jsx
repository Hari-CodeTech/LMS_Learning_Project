import { Link } from "react-router-dom";
function About() {


    return (

        <section className="about" id="about">

            <div className="about-content">

                <h2>About Our LMS</h2>

                <h3>
                    Making Learning Simple and Accessible
                </h3>

                <p>
                    Our Learning Management System provides
                    a simple and effective platform for students
                    to explore courses, develop new skills and
                    monitor their learning progress.

                    We aim to make education accessible,
                    organized and effective for everyone.
                </p>

                <Link to="/login" className="btn btn-primary">
    Start Learning
</Link>

            </div>

        </section>

    );

}

export default About;