import React,{useEffect} from 'react';
import axios from 'axios'
function Question(props) {

    useEffect(()=>{
        axios({
            baseURL: 'https://opentdb.com/api_config.php',
            method: "get"
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log('ERROR')
        })
    },[])

    const numbers = [5,10,15,20,25]
    const categories = [
        {
            english: "eshlish"
        }
    ]

    return (
        <div className={"container"}>
            <div className="row">

                <div className="navbar">
                    <div className="nav-item">
                        <h3>FINAL EXAM ( FAKE )</h3>
                    </div>
                </div>

                <div className="col-md-6 offset-3">
                    <label htmlFor="question">Number of questions</label>
                    <select className={'form-control'} id={'question'}>
                        {
                            numbers.map((item,index)=> <option key={index}>
                                {item}
                            </option>)
                        }
                    </select>

                    <label htmlFor="question">Select Category</label>
                    <select className={'form-control'} id={'question'}>

                    </select>
                </div>

            </div>
        </div>
    );
}

export default Question;
