import React, {useEffect,useContext ,useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
function Question({sendAxios}) {


    const numbers = [10,15,20,25,30]
    const categories = [
        {
            title: "Sports",
            id: 21
        },
        {
            title: "History",
            id: 23
        },
        {
            title: "Arts",
            id: 25
        },
        {
            title: "Animals",
            id: 27
        },
    ]



    const [numId,setnumId] = useState(10)
    const [title,setTitle] = useState(21)

   function getAxios(){
       sendAxios(numId,title)
    }



    return (
        <div className={"container mt-2"}>
            <div className="row">

                <div className="navbar">
                    <div className="nav-item">
                        <h3>FINAL EXAM ( FAKE )</h3>
                    </div>
                </div>

                <div className="col-md-6 offset-md-3">
                    <label htmlFor="question">Number of questions</label>
                    <select value={numId} onChange={(e)=>setnumId(e.target.value)} className={'form-control'} id={'question'}>
                        {
                            numbers.map((item,index)=> <option key={index}>
                                {item}
                            </option>)
                        }
                    </select>

                    <label htmlFor="question">Select Category</label>
                    <select value={title} onChange={(e)=>setTitle(e.target.value)} className={'form-control'} id={'question'}>
                        {
                            categories.map((item,index)=> <option key={item.id} value={item.id}>{item.title}</option>)
                        }
                    </select>
                    <Link to={'/quiz'}>
                        <button onClick={getAxios} className={'btn form-control mt-3 btn-outline-primary'}>START</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Question;
