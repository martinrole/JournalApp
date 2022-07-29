import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogOutAsync } from '../../ACTIONS/actionAuth'
import { newNoteAction } from '../../ACTIONS/actionNotes'
import { JournalEntries } from './JournalEntries'


export const Sidebar = () => {

    const { name } = useSelector(state => state.auth) 
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch( actionLogOutAsync() )
    }

    const handleAddNote = () => {
        dispatch( newNoteAction() )
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { name }</span>
                </h3>

                <button className="btn" onClick={ handleLogOut }>Log out</button>
            </div>

            <div className="journal__new-entry" onClick={ handleAddNote }>
                <i className="far fa-calendar-plus fa-3x"></i>
                <p className="mt-5">New Note</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
