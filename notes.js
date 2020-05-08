const fs = require('fs')
const chalk = require('chalk')


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const isDuplicate = notes.some(note => note.title === title)
    if (!isDuplicate) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter(note => note.title !== title)
    if (filteredNotes.length === notes.length) {
        console.log(chalk.red.inverse('Note not found'))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length) {
        console.log(chalk.underline.bold('Your notes:'))
        notes.forEach(note => {
            console.log(' - ' + note.title)
        })
    } else {
        console.log(chalk.red.inverse('No notes found'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.underline.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}