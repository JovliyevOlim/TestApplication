import React, {useEffect, useState} from 'react';
import './quiz.css'
import {ModalHeader,Modal,ModalBody,ModalFooter} from "reactstrap";
import axios from "axios";

function Quiz({numId,title}) {

    const [radioValue,setradioValue] = useState("")

    useEffect(()=>{
        setpages(numId)
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

    //Pagination start

    const  [data2,setData2] = useState([])


    useEffect(()=>{

        data.map(item=>{
                item.incorrect_answers.push(item.correct_answer);
                item.incorrect_answers.sort(()=>Math.random()-0.5)
            }

        );
        let a =[...data]
        setData2(a)
    },[data])

    const [pages,setpages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        const startIndex = (currentPage-1) * 1 - 1;
        const endIndex = startIndex + 1;

    }

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        const startIndex = (currentPage+1) * 1 - 1;
        const endIndex = startIndex + 1;

    }

    const getPaginationGroup = () => {

        let start = Math.floor((currentPage - 1) / numId) * numId;
        return new Array(Math.round(numId)).fill().map((_, idx) => start + idx + 1);

    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber) * 3 - 3;
        const endIndex = startIndex + 3;
    }

    const [modal,setModal] = useState(false)

    function accept(){
        data.map(item=>{
            if (radioValue == item.correct_answer){
                setModal(!modal)
            }else {
                console.log("WRONG");
                setModal(!modal)
            }
        })
    }

    function exit(){
        setModal(!modal)
    }

    return (
        <div className={'container'}>
            <div className="row">
                <div className="navbar">
                    <h3>FINAL EXAM</h3>
                    {console.log(data)}
                    <button className={'btn btn-danger'}>FINISH</button>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-3">
                        <div className="pagination">
                            {getPaginationGroup().map((item, index) => (
                                <button
                                    key={index}
                                    onClick={changePage}
                                    className={`paginationItem ${currentPage === item ? 'activePage' : null}`}
                                >
                                    <span>{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {
                    data2.slice(currentPage-1,currentPage).map(item=>
                        <div key={item.id} className="card">
                            <div className="card-header">

                                <h3>{item.question}</h3>

                            </div>
                            <div className="card-body ">
                                {
                                    item.incorrect_answers.map(val=>
                                        <div className={'answers'}>
                                            <input type="radio" value={val} onChange={(e)=>setradioValue(e.target.value)} id={val} name={'radio'} />
                                            <label className={'answers'} htmlFor={val}>{val}</label>

                                        </div>
                                    )
                                }
                                <Modal isOpen={modal} >
                                    <ModalBody>
                                        <h4 className={'correct'}>To`g`ri Javob : </h4>
                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={exit} className={'btn btn-primary'}>Chiqish</button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <div className="card-footer footer">
                                <button onClick={goToPreviousPage}
                                        className={`btn btn-outline-primary prev ${currentPage === 1 ? 'disabled' : ''}`}
                                        disabled={currentPage===1 ? true : false}>Previous</button>
                                <button className={'btn btn-outline-secondary'} onClick={accept}>Submit</button>
                                <button onClick={goToNextPage}
                                        className={`btn btn-outline-primary next ${currentPage === Math.round(numId) ? 'disabled' : ''}`}
                                        disabled={currentPage=== Math.round(numId) ? true : false}>Next</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Quiz;
