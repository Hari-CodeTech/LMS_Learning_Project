function Features() {

    return (

        <section className="features" id="courses">

            <div className="features-heading">

                <h2>Why Choose Our LMS?</h2>

                <p>
                    Everything you need to make your learning journey successful.
                </p>

            </div>


            <div className="features-container">

                {/* First Card */}

                <div className="feature-card">

                    <div className="feature-icon">📚</div>

                    <h3>Quality Courses</h3>

                    <p>
                        Explore well-structured courses designed
                        to improve your knowledge and skills.
                    </p>

                </div>


                {/* Second Card */}

                <div className="feature-card">

                    <div className="feature-icon">🎯</div>

                    <h3>Track Progress</h3>

                    <p>
                        Monitor your learning progress and
                        stay focused on achieving your goals.
                    </p>

                </div>


                {/* Third Card */}

                <div className="feature-card">

                    <div className="feature-icon">🚀</div>

                    <h3>Learn Anywhere</h3>

                    <p>
                        Access your learning resources
                        anytime and from anywhere.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default Features;