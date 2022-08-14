import React, {useState, useContext, createContext} from "react";
import Question from "./components/Question";
import {Route, Switch} from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import axios from "axios";

function App() {


   function sendAxios(numId,title){
       setTitle(title)
       setnumId(numId)
    }

    const [numId,setnumId] = useState(10)
    const [title,setTitle] = useState(21)


    return (
        <div>
            <Switch>
                <Route path={'/quiz'} component={props=><Quiz {...props} numId={numId} title={title} /> }/>
                <Route path={'/'} component={props=><Question {...props} sendAxios={sendAxios} />}/>
            </Switch>
        </div>

    );
}

export default App;
