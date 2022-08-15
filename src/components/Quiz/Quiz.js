import React, {useEffect, useState} from 'react';
import './quiz.css'
import {ModalHeader,Modal,ModalBody,ModalFooter} from "reactstrap";
import {Link} from 'react-router-dom'
import axios from "axios";

function Quiz({numId,title}) {

    const [radioValue,setradioValue] = useState("")

    useEffect(()=>{
        setpages(numId)
        axios({
            baseURL: 'https://opentdb.com/api.php?amount=' + numId+ '&category='+title + "&type=multiple",
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
                item.difficulty=' '
                item.type = false

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

    const [isCorrect,setCorrect] = useState([])
    function accept(question){
       data2.map((item,index)=>{
           if (item.question === question){
               item.type = true
               isCorrect.push(index+1)
               let b = [...isCorrect]
               console.log(b)
               setCorrect(b)
           }
       })

        let  a = [...data2]
        setData2(a)
    }
    function changeradio(e,question){
        console.log(e.target.value)
        data2.map(item=>{
            if (item.question === question){
                console.log('chis')
                item.difficulty = e.target.value
            }
        })
        let  a = [...data2]
        setData2(a)
    }

    function exit(){
        setModal(!modal)
    }

    const [trueanswers,setTrueAnswers] = useState(0)

    function finishtest(){
        let a = 0
        data2.map(item=>{
            data.map(val=>{
                if(item.difficulty===val.correct_answer){
                     a++
                }
            })
        })
        setTrueAnswers(a)
        exit()
    }


    return (
        <div className={'container'}>

            <div className="row">
                <div className="navbar">
                    <h3>FINAL EXAM</h3>
                    <button onClick={finishtest} className={'btn btn-danger'}>FINISH</button>
                </div>

                <div className="d-flex justify-content-center">
                        <div className="pagination flex-wrap">
                            {getPaginationGroup().map((item, index) =>

                                <button
                                    key={index}
                                    onClick={changePage}
                                    className={`paginationItem ${currentPage === item ? 'activePage' : null}
                                        ${
                                        isCorrect.some(number=>{
                                            return item===number
                                        }
                                        ) ? 'checked':''
                                    }
                                    `}
                                >
                                    <span>{item}</span>
                                </button>
                            )}
                        </div>
                </div>

                {
                    data2.slice(currentPage-1,currentPage).map((item,index)=>
                        <div key={item.id} className="card">

                            <div className="card-header">

                                <h3>{item.question}</h3>

                            </div>
                            <div className="card-body ">
                                {
                                    item.incorrect_answers.map((val,ind)=>
                                        <div key={ind} className={item.type? (val===item.correct_answer?'correct':val!==item.correct_answer && val===item.difficulty?"incorrect":'white'):''}>
                                            <input disabled={item.type? true :false} type="radio" value={val}     checked={item.difficulty === " " ? false : item.difficulty !== val ? false : true} onChange={e=>changeradio(e,item.question)} id={val} name={'radio'} />
                                            <label className={'answers'} htmlFor={val}>{val}</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="card-footer footer">
                                <button onClick={goToPreviousPage}
                                        className={`btn btn-outline-primary prev ${currentPage === 1 ? 'disabled' : ''}`}
                                        disabled={currentPage===1 ? true : false}>Previous</button>
                                <button disabled={item.difficulty === " " || item.type? true :false} className={'btn btn-outline-secondary'} onClick={()=>accept(item.question)}>Submit</button>
                                <button  onClick={goToNextPage}
                                        className={`btn btn-outline-primary next ${currentPage === Math.round(numId) ? 'disabled' : ''}`}
                                        disabled={currentPage=== Math.round(numId) ? true : false}>Next</button>
                            </div>
                        </div>
                    )
                }
            </div>


            <Modal isOpen={modal} toggle={exit}>
                <ModalHeader>
                    <h2>Your results</h2>
                </ModalHeader>

                <ModalBody>
                    <h2>{trueanswers} / {numId}</h2>
                    <br/>
                    or
                    <br/>
                    <h2>{trueanswers/numId *100} %</h2>
                </ModalBody>
                <ModalFooter>
                    <button onClick={exit}>Ok</button>
                   <Link to={"/"}><button>Go Home</button></Link>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Quiz;
