import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileUpload, saveNoteAction } from '../../ACTIONS/actionNotes'

export const NoteAppBar = () => {

    const dispatch = useDispatch()
    const { activeNote } = useSelector(state => state.notes)

    const saveClick = () => {
        dispatch( saveNoteAction( activeNote ) )
    }

    const pictureClick = () => {
        // document.getElementById('inputFile').click()
        document.querySelector('#inputFile').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            dispatch( fileUpload(file) )
        }

    }

    return (
        <div className="notes__appbar">
            <span>28 de Agosto de 2020</span>

            <input 
                id="inputFile"
                name="fileNote"
                type="file" 
                style={ { display: 'none' } } 
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn" onClick={ pictureClick }>Picture</button>
                <button className="btn" onClick={ saveClick }>Save</button>

            </div>
        </div>
    )
}
