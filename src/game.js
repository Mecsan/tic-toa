import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Board from './board';
import Winner from './winnermsg';
import Players from './players';
import Selection from './selection';

function Game({ p1, p2, name, room, online }) {

    // setting up all the states

    let [wait, setwait] = useState(true);

    let arr = ["", "", "", "", "", "", "", "", ""];
    let [board, setboard] = useState(arr);
    // for 3*3 board
    let [turn, setturn] = useState("0");
    // turn either 0 or x
    let [players, setplayers] = useState(null);
    // information about player

    let [gamewinner, setwinner] = useState(null);
    // to check the winner
    let [cn, setcn] = useState(0);
    // to count total numberof try if(cn=9) then after that match should be drawn
    let [select, setsel] = useState("");
    // to check the option for 1 player ,like either 0 or x

    let [gamestart, setstart] = useState(false);
    // to check game is currently running or end


    let [gameend, setend] = useState(false);
    // either match is drawn or get winner


    let [sio, setio] = useState(null);

    let navigate = useNavigate();

    class player {
        constructor(name, choice, mainname) {
            this.name = name;
            this.choice = choice;
            if (name == mainname) {
                this.sel = true;
            } else {
                this.sel = false;
            }
        }
    }

    if (sio) {

        sio.on('somejoined', (data) => {

            let ans = data.filter((x) => {
                return x.room == room;
            })
            // console.log(data);
            if (ans.length == 2) {
                setwait(false);
                let player1 = new player(ans[0].name, '0', name);
                let player2 = new player(ans[1].name, 'x', name);
                setplayers([player1, player2]);
                if (player1.sel == true) {
                    setsel(player1.choice);
                } else {
                    setsel(player2.choice);
                }
            }
        })

        sio.on('selectchnagedrec', (data) => {
            let newplayers = data.map((x) => {
                if (x.name == name) {
                    x.sel = true;
                    return x;
                } else {
                    x.sel = false;
                    return x;
                }
            })
            setplayers(newplayers);
            setsel(newplayers.find((x) => {
                return x.sel == true;
            }).choice);
        })


        sio.on('boardchangedrec', ({ newboard, newturn }) => {
            setboard(newboard);
            setturn(newturn);
        })


        sio.on('cantjoin', (data) => {
            console.log(data);
        })


        sio.on('resetboardrec', (data) => {
            finalclearboard();
        })
    }

    let finalclearboard = () => {
        setboard(["", "", "", "", "", "", "", "", "", ""]);
        setwinner("");
        setstart(false);
        setcn(0);
        setend(false);
    }

    // to reset the 3*3 board
    let clearBoard = () => {
        finalclearboard();
        if (sio) {
            sio.emit('resetboard', room);
        }

    }

    let playagain = () => {
        clearBoard();
    }



    // at the starting we are checking about players and setting them
    useEffect(() => {

        if ((p1 == "" || p2 == "") && (name == "" || room == "")) {
            navigate("/");
        } else {
            if (!online) {
                setwait(false);
                let player1 = new player(p1, '0', p1);
                let player2 = new player(p2, 'x', p1);

                setplayers([player1, player2]);
                if (player1.sel == true) {
                    setsel(player1.choice);
                } else {
                    setsel(player2.choice);
                }
            } else {
                //// for to deploy
                // let url = window.location.origin;
                // const socket = io(url);
                //////////////

                let url = "http://localhost:2000";
                const socket = io(url, { transports: ["websocket"] });
                setio(socket);

                socket.emit('room', {
                    name,
                    room,
                })
            }
        }

    }, [])

    return (

        <div>

            {wait && <div className='waitmsg'>wait for other player to join</div>}
            {players && <div className='game'>

                  {/* showing players name and there choice about x or 0 */}

                { <div>
                    <div className="lhs">
                        {<Players players={players} />}




                        {/* giving option for 1 player to choose either 0 or x  */}

                        <Selection
                            select={select}
                            gamestart={gamestart}
                            setsel={setsel}
                            players={players}
                            setplayers={setplayers}
                            turn={turn}
                            setwinner={setwinner}
                            cn={cn}
                            setend={setend}
                            online={online}
                            sio={sio}
                            room={room}
                            name={name}

                        />

                        {/* /* to display the winner or the draw message */}
                        {gameend &&
                            <Winner
                                gamewinner={gamewinner}
                                players={players}
                                playagain={playagain}
                                name={name} />
                        }
                        <button className='clear' onClick={clearBoard}>Clear Board</button>

                    </div>


                    <div className="rhs">
                        <Board board={board}
                            setboard={setboard}
                            setstart={setstart}
                            gamestart={gamestart}
                            gamewinner={gamewinner}
                            setcn={setcn}
                            turn={turn}
                            setturn={setturn}
                            setwinner={setwinner}
                            setend={setend}
                            online={online}
                            sio={sio}
                            room={room}
                            players={players}
                            cn={cn}
                        />



                    </div>

                </div>}
        </div>
}

        </div >
    )

}

export default Game;