import React from 'react'

function Players({ players }) {
    return (
        <div className="players">
            <div className='player'>
                <div className='h'>{players[0].choice}</div>
                <div className='b'>
                    {players[0].name}
                </div>
            </div>
            <div className='player'>
                <div className='h'>{players[1].choice}</div>
                <div className='b'>
                    {players[1].name}
                </div>
            </div>
             
        </div>
    )
}

export default Players