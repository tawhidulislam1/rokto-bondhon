import About from "./Components/About";
import Contact from "./Components/Contact";
import Featured from "./Components/Featured";
import Header from "./Components/Header";

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
                <Contact></Contact>
            </section>
        </div>
    );
};

export default Homepage;