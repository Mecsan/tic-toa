import React from 'react'

function Winner({ gamewinner, players, playagain, name }) {
    return (
        <div className="winnermain">
            <div className="winnermsg">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>
                        {
                            !gamewinner? 'match is draw':
                            (players.find((x) => {
                                return x.choice === gamewinner
                            }).name === name ? ' congo you won the game' :
                            players.find((x) => {
                                return x.choice === gamewinner
                            }).name + ' won the game')}

                    </strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            <button className='again' onClick={playagain}>
                Play Agian
            </button>
        </div>
    )
}

export default Winner