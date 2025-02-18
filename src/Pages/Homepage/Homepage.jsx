import About from "./Components/About";
import Contact from "./Components/Contact";
import Featured from "./Components/Featured";
import Header from "./Components/Header";
import LastestBlog from "./Components/LastestBlog";
import Stats from "./Components/Stats";

const Homepage = () => {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <section>
                <About></About>
            </section>
            <section>
                <Featured></Featured>
            </section>
            <section>
                <Stats></Stats>
            </section>
            <section>
                <LastestBlog></LastestBlog>
            </section>

            <section>
                <Contact></Contact>
            </section>
        </div>
    );
};

export default Homepage;