import Featured from "./Components/Featured";
import Header from "./Components/Header";

const Homepage = () => {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <section>
                <Featured></Featured>
            </section>
        </div>
    );
};

export default Homepage;