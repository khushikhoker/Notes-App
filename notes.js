const fs = require('fs')
const chalk = require('chalk')


const addNote = function (title, body)  {
    const notes = loadNotes()
    
    
    const duplicateNotes = notes.find((note) => note.title === title )
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes =  (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function (title){
    const notes= loadNotes()
    const notestokeep=notes.filter( (note) => note.title !== title)
//     const notestokeep=notes.filter(function (note){
//         return note.title !== title
//    })
    if(notes.length> notestokeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notestokeep) 
    }
    else{
        console.log(chalk.red.inverse("No Note found"))
    }
     
    
}

 const listNotes = () =>{
     const notes = loadNotes()
     console.log(chalk.inverse("your Notes"))
     notes.forEach((note)=>{
         console.log(note.title)
     })
 }
 const readNotes= (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)
     if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
     }else{
        console.log(chalk.red.inverse('Note not found!'))
     }
 }
 

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}

