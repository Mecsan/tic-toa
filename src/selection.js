import React from 'react'

function Selection({ online, sio, room, turn, name, select, gamestart, setsel, players, setplayers }) {


    let changeselection = (e) => {
        
            let x = e.target.value;
            setsel(x);
            let y = (x == 'x') ? '0' : 'x';
            let newplayers = players.map((ele) => {
                if (ele.sel == true) {
                    return (
                        { ...ele, choice: x }
                    )
                } else {
                    return (
                        { ...ele, choice: y }
                    )
                }
            })
            if (online) {
                sio.emit('selectionchanged', { newplayers, room });
            } else {
                setplayers(newplayers);
            }

        
    }


    return (
        <div className="selmain">

            <div className="selection">
                <div className='sel'>
                    {players.find((x) => {
                        return x.sel == true;
                    }).name} : 
                </div>

                <select value={select}
                    className={gamestart ? 'disabled' : 'nornaml'}
                    disabled={gamestart}
                    onChange={changeselection} >
                    <option value="x">x</option>
                    <option value="0">0</option>
                </select>
            </div>
            <div className="msg">
                {players && (players.find((x) => {
                    return x.choice == turn
                }).name == name) ? 'Your turn' :
                    players.find((x) => {
                        return x.choice == turn
                    }).name +" 's turn"
                    }</div>
        </div>
    )
}

export default Selection