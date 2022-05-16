import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Form({ p1, p2, ro, on, off, na }) {

    let navigate = useNavigate();


    // jc = join or create at starting default is join


    let [room, setroom] = ro;
    let [online, setonline] = on;
    let [offline, setoffline] = off;
    let [name, setname] = na;








    let form_fun = (e) => {
        e.preventDefault();
        navigate("/play");
    }

    let select_on = () => {
        setonline(true);
        setoffline(false);
    }

    let select_off = () => {
        setonline(false);
        setoffline(true);
    }



    let submitroom = () => {
        navigate("/play");
    }




    return (
        <div className="mainform">
            <div className="online">

                <button onClick={select_on}>online</button>
                {
                    online && <div className='onlineform'>
                        <div>
                            <label htmlFor="p1">your name : </label>
                            <input type="text" value={name}
                                onChange={(e) => setname(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="p1">Room name : </label>
                            <input type="text" value={room}
                                onChange={(e) => setroom(e.target.value)}></input>
                            <br />
                            
                        </div>
                        <button className='submit' onClick={submitroom}>
                                join
                            </button>

                    </div>
                }
            </div>
            <div className="offline">

                <button onClick={select_off}>offline</button>


                {offline && <div className='form'>
                    <form onSubmit={form_fun}>
                        <div>
                            <label htmlFor="p1">Player 1's name : </label>
                            <input type="text" name="p1" id="p1" value={p1[0]}
                                onChange={(e) => {
                                    p1[1](e.target.value);
                                }}></input>
                            <span className='err'></span>
                        </div>
                        <div>

                            <label htmlFor="p2">player 2's name : </label>
                            <input type="text" name="p2" id="p2" value={p2[0]}
                                onChange={(e) => {
                                    p2[1](e.target.value);
                                }}></input>
                            <span className='err'></span>
                        </div>
                        <input className='submit' type="submit" name='submit' value="Play" ></input>
                    </form>
                </div>}
            </div>
        </div>
    )
}

export default Form;