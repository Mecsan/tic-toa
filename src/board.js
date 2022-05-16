import React from 'react'
import Box from './box'
import { useEffect } from 'react'

function Board({ setstart,
    board,
    setturn,
    gamestart,
    gamewinner,
    setboard,
    setcn,
    turn,
    setwinner,
    cn,
    setend,
    online, sio, room, players }) {

    // logic for playing game whenever user click on any box it
    // should be updated by 0 or x
    let play = (e, id) => {

        let ok = true;

        if (!gamestart) {
            setstart(true);
        }

        setcn((cn) => {
            return cn + 1;
        })

        if (online) {

            if (turn != players.find(x => x.sel == true).choice) {
                ok = false;
            }

        }

        if (!gamewinner && board[id] == "" && ok) {

            let newboard = board.map((x, idx) => {
                if (idx == id) {
                    return turn;
                }
                return x;
            })

            let newturn = (turn == 'x' ? '0' : 'x');

            if (online) {
                sio.emit('boardchange', { newboard, newturn, room })
            } else {
                setboard(newboard);
                setturn(newturn);
            }
        }


    }


    // winner logic that should be run every time when board gets update



    useEffect(() => {
         
            let winner = getwinner(board);
            if (winner) {
                setwinner(winner);
                setend(true)
            } else if(cn == '9'){
                setend(true);
            }
           

         

    }, [board])




    let getwinner = (board) => {
        let ret = null;
        let success = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        success.forEach(subarr => {
            if (!ret) {

                if (board[subarr[0]] == '0' &&
                    board[subarr[1]] == '0' &&
                    board[subarr[2]] == '0') {
                    ret = '0';


                }
                else if (board[subarr[0]] == 'x' &&
                    board[subarr[1]] == 'x' &&
                    board[subarr[2]] == 'x') {
                    ret = 'x';


                }
            }
        });
        return ret;
    }

    return (
        <div className="box">
            {
                board.map((val, idx) => {
                    return (
                        <div key={idx} className='boxes'>
                            <Box val={val} play={play} idx={idx} />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Board