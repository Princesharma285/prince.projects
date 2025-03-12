"use client"
import React, { useState } from 'react'

const page = () => {
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [maintTask, setMainTask] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault()
        setMainTask([...maintTask, { title, desc }]);
        settitle("");
        setdesc("")
        console.log(maintTask);
    };

    const deleteHandler = (i)=>{
     let copytask = [...maintTask]
     copytask.splice(i,1)
     setMainTask(copytask)
    }

    let rendertTask = <h2>no task available</h2>;

if(maintTask.length>0)
    {
    rendertTask = maintTask.map((t, i) => {
        return (
            <li key={i} className='flex items-center justify-between mb-8'>
                <div className="flex item-center justify-between mb-5 w-2/3">
                    <h5 className='text-2xl font-semibold'>{t.title}</h5>
                    <h6 className='text-lg font-medium'>{t.desc}</h6>
                </div>
                <button 
                onClick={()=>{deleteHandler(i)}}
                className='bg-red-500 text-white px-4 py-2 rounded'>Delete</button>
            </li>
        );
    })
}



    return (
        <>
            <h1 className='bg-black text-white p-5 font-bold text-5xl text-center'>prince todolist</h1>
            <form onSubmit={submitHandler}>
                <input type='text'
                    className='border-zinc-800 border-2 m-5 px-4 py-2 
                placeholder: kuchh likhdo'
                    placeholder="enter task"
                    value={title}
                    onChange={(e) => {
                        settitle(e.target.value)
                    }} />
                <input type='text'
                    className='border-zinc-800 border-2 m-5 px-4 py-2 '
                    placeholder='enter description hear'
                    value={desc}
                    onChange={(e) => {
                        setdesc(e.target.value)
                    }} />
                <button className='bg-black px-4 py-3 font-bold text-white text-2xl rounded m-5'>add task</button>
            </form>
            <hr />
            <div className="bg-slate-200 p-8 ">
                <ul>
                {rendertTask}
                </ul>      
            </div>
        </>
    )
}

export default page
