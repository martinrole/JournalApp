import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../HOOKS/useForm'
import { NoteAppBar } from './NoteAppBar'
import { useDispatch} from 'react-redux'
import { activeNote, deleteNoteAction } from '../../ACTIONS/actionNotes'

export const NoteScreen = () => {

    const { activeNote: nota } = useSelector(state => state.notes) 
    const[ formValues, handleInputChange, reset ] = useForm( nota )
    const { titulo, texto } = formValues

    const activeId = useRef( nota.id )
    const dispatch = useDispatch()
    
    useEffect(() => {
       
        if ( nota.id !== activeId.current ) {
            //Explicación de esto video 266 Minuto 4
            reset( nota )
            activeId.current = nota.id
        }

    }, [reset, nota])


    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues } ) )
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( deleteNoteAction( formValues.id ) )
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    name="titulo" 
                    placeholder="Write title" 
                    className="notes__title-input" 
                    autoComplete="off"
                    value={ titulo }
                    onChange={ handleInputChange }
                />
                <textarea 
                    placeholder="What happened today?"
                    name="texto" 
                    className="notes__textarea" 
                    cols="30" 
                    rows="10"
                    value={ texto }
                    onChange={ handleInputChange } 
                ></textarea>

                {
                    ( nota.imgUrl ) 
                    && (
                        <div className="notes__image">
                            <img src={ nota.imgUrl } alt="img note" />
                        </div>
                    )
                }

            </div>

            <button className="btn btn-danger" onClick={ handleDelete }>Delete Note</button>
        </div>
    )
}
