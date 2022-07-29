import { collection, getDocs } from "@firebase/firestore"
import { baseDatos } from "../FIREBASE/firebaseConfig"

export const loadNotes = async (uid) => {

    const notesSnap = await getDocs(collection(baseDatos, `${uid}/journal/notes`))
    const notes = []

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })
    
    return notes
}