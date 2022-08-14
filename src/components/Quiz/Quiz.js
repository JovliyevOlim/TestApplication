import React, {useEffect, useState} from 'react';
import './quiz.css'
import axios from "axios";

function Quiz({numId,title}) {


    useEffect(()=>{
        axios({
            baseURL: 'https://opentdb.com/api.php?amount=' + numId+ '&category='+title,
            method: "get"
        }).then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.log('E R R O R')
        })
    },[])

    const [data,setData] = useState([])




    return (
        <div className={'container'}>
            <div className="row">
                <div className="navbar">
                    <h3>FINAL EXAM</h3>
                    {console.log(data)
                    }
                    <button className={'btn btn-danger'}>FINISH</button>
                </div>
                {
                    data.slice(0,1).map(item=>
                        <div key={item.id} className="card">
                            <div className="card-header">


                                <h3>{item.question}</h3>

                            </div>
                            <div className="card-body">
                                <input type="radio" />
                                <label htmlFor="">{item.correct_answer}</label>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Quiz;
