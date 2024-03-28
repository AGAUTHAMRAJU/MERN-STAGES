import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
    const name = "Sai Pavan Velidandla";
    const [msg,setMsg] = useState('');
    const [blocks,setBlocks] = useState([]);
    const update = (e) => {
        setMsg(e.target.value)
    }


    const send = () => {
        if (msg.trim() !== '') {
            axios.post('http://localhost:3001/send-message', { message: msg })
                .then(response => {
                    console.log(response.data); // Log the response from the backend
                    setBlocks([...blocks, { msg: msg }]);
                    setMsg('');
                    document.querySelector("#msg").focus();
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };


    return (
        <div className='container-ch'>
            <header>
                <h3>SLACK4E</h3>
                <menu>
                    <li className='active'>Channels</li>
                    <li>Content</li>
                    <li>Live Stream</li>
                    <li>Students</li>
                    <li>Instructors</li>
                </menu>
            </header>
            <div id="main-ch">
                <div id="sidebar-ch">
                    <menu>
                        <li className='active'># Sales Team</li>
                        <li># Marketing Team</li>
                        <li># Development Team</li>
                        <li># Testing Team</li>
                        <li># Product Team</li>
                    </menu>
                    <Link to="/logout" id="lo-ch">Logout</Link>
                </div>
                <div id="content-ch">
                    <div id="blocks-ch">
                        {blocks.map((block,index) => (
                            <div className={index % 2 === 0 ? "block left" : "block right"} key={index}>
                                <h4>{name}</h4>
                                <p>{block.msg}</p>
                            </div>
                        ))}
                    </div>
                    <div id="msgbox-ch">
                        <input type="text" id="msg" value={msg} placeholder="Type your message" onChange={update}/>
                        <button onClick={send}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container;