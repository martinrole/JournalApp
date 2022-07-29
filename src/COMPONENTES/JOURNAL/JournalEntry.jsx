import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { activeNote } from '../../ACTIONS/actionNotes'

export const JournalEntry = ( { id, titulo, texto, fecha, imgUrl } ) => {

    const noteDate = moment(fecha)
    const dispatch = useDispatch()
    
    const handleNote = () => {
        dispatch( activeNote( id, { titulo, texto, fecha, imgUrl } ) )
    }

    return (
        <div className="journal__entry pointer" onClick={ handleNote }>

            <div className="journal__entry-body">
                <p className="journal__entry-title">{ titulo }</p>
                <p className="journal__entry-content">{ texto }</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd')}</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
