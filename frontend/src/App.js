import React, {Component, useContext} from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Demoform, {FullAccessForm} from "./Components/Demoform";
import Registration from "./Components/Registration";
import {UserContext} from "./context/UserContext";
import Login from "./Components/Login";

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             foo: "bar",
//             resumeData: {}
//         };
//
//         ReactGA.initialize("UA-110570651-1");
//         ReactGA.pageview(window.location.pathname);
//     }
//
//
//     render() {
//         return (
//             <div className="App">
//                 <Header/>
//                 <About/>
//                 <Demoform/>
//                 <Footer/>
//                 <Registration/>
//             </div>
//         );
//     }
// }

const App = () => {
    const [token, setToken] = useContext(UserContext)
    // token = localStorage.getItem('token')
    console.error(`token is ${token}`)
    return (
        <>
            <div className="App">
                <Header/>
                <About/>
                {!token ? (
                    <>
                        <Demoform/>
                    </>
                ) : <FullAccessForm/>}
                <Footer/>
                {!token ? (
                    <>
                        <Registration/>
                        <Login/>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </>

    );
}

export default App;
