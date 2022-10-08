import './App.css';
import React, { useEffect, useState } from 'react';

let operatorInUse = false;

function App() {

    const [input, setInput] = useState('0')    //number entering now
    const [expression, setExpression] = useState('')  //for showint expression in display-1, and for calculating
    const [finished, setFinished] = useState(false)

    

    //when click any number button (include .)
    const inputNum = (e) => {

        if (finished === true) {
            setFinished(false)
            setExpression('')
        }

        operatorInUse = false;

        if (input.includes('.') && e.target.innerText === '.') return  //make sure there is no more than one dot in number

        if ((input === '0' || input === '') && e.target.innerText === '.') {   //when first input is '.'
            setInput('0.')
        }
        else if ((input === '0' || input === '') && e.target.innerText !== '.') {  //first time input, need to replace '0'
            setInput(e.target.innerText)
        }
        else if (input !== '0' && input !== '') {  //when is not the first input
            setInput(input + e.target.innerText)
        }
    }

    //make sure when component is first loaded, expression is '', input is '0'
    useEffect(() => {
        setExpression('')
        setInput('0')
    }, [])

    //to solve useState's async problem
    useEffect(() => {
        if (finished === true) {
            let result;
            if(expression.charAt(expression.length - 1) === '+' || expression.charAt(expression.length - 1) === '-' 
                || expression.charAt(expression.length - 1) === '*' || expression.charAt(expression.length - 1) === '/' ){
                result = eval(expression.substring(0, expression.length - 1))
            }else{
                result = eval(expression)
            }
            
            setInput(result + '')
            setExpression('')
        }
    }, [finished])

    //when click any operator button
    const operatorType = (e) => {
        if (operatorInUse === true) {
            return
        } else {
            operatorInUse = true;

            let operator = e.target.innerText;
            //if click 'X', need to transfer to '*'
            if (operator === 'X') {
                operator = '*';
            }

            if (finished === true) {
                setFinished(false)
                setExpression((pre) => pre + input + operator)
                setInput('')

            } else {
                //once click operator button, concatenate input and operator to the expression
                setExpression((pre) => pre + input + operator)
                setInput('')   //reset input state
            }
        }
    }

    //when click 'AC' button
    const reset = () => {
        setInput('0')
        setExpression('')
    }

    //when click '%' button
    const percent = () => {
        if (input === '0' || input === '' || input === '0.') {
            return
        } else {
            let num = parseFloat(input) / 100
            setInput(num + '')
        }
    }

    //when click '+/-' button
    const minusPlus = () => {
        if (input.charAt(0) === '-') {
            setInput(input.substring(1))
        } else {
            setInput('-' + input)
        }
    }

    const equals = () => {

        //using useState to update state is asynchronously
        //即：页面已经渲染出结果，但是真正的state状态还是以前的
        //如：即使使用了setExpression进行了更新，此时expression依旧没有及时更新，但是页面已经成功渲染为更新后的状态
        //解决方法：use useEffect hook
        setFinished(true)
        setExpression((pre) => pre + input)
    }








    return (
        <div className='container'>
            <div className='screen'>
                <div className='display-1'>{expression}</div>
                <div className='display-2'>{input}</div>
            </div>
            <div className='btn light-gray' onClick={reset}>AC</div>
            <div className='btn light-gray' onClick={minusPlus}>+/-</div>
            <div className='btn light-gray' onClick={percent}>%</div>
            <div className='btn blue' onClick={operatorType}>/</div>

            <div className='btn' onClick={inputNum}>7</div>
            <div className='btn' onClick={inputNum}>8</div>
            <div className='btn' onClick={inputNum}>9</div>
            <div className='btn blue' onClick={operatorType}>X</div>

            <div className='btn' onClick={inputNum}>4</div>
            <div className='btn' onClick={inputNum}>5</div>
            <div className='btn' onClick={inputNum}>6</div>
            <div className='btn blue' onClick={operatorType}>-</div>

            <div className='btn' onClick={inputNum}>1</div>
            <div className='btn' onClick={inputNum}>2</div>
            <div className='btn' onClick={inputNum}>3</div>
            <div className='btn blue' onClick={operatorType}>+</div>

            <div className='btn zero' onClick={inputNum}>0</div>
            <div className='btn' onClick={inputNum}>.</div>
            <div className='btn equal blue' onClick={equals}>=</div>
        </div>
    )
}

export default App;