import Hangman from './hangman'
import getPuzzle from './requests'

let word1

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')

// difficulty elements
const labelElWordCount = document.querySelector('#label')
const labelElGuessesLeft = document.querySelector('#label2')
const inputElWordCount = document.querySelector('#word-count')
const inputElGuessesLeft = document.querySelector('#guesses-left')


labelElWordCount.textContent = `Word Count: ${inputElWordCount.value}`
labelElGuessesLeft.textContent = `Guesses Left: ${inputElGuessesLeft.value}`

// if (word1.status !== 'playing') {
//     document.querySelectorAll('.keyboard-button').setAttribute('disabled', 'true')
// }

document.querySelector('#word-count').addEventListener('change', (e)=> {
    labelElWordCount.textContent = `Word Count: ${String(e.target.value)}`
})
document.querySelector('#guesses-left').addEventListener('change', (e) => {
    labelElGuessesLeft.textContent = `Guesses Left: ${String(e.target.value)}`
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent
    word1.makeGuess(key)
    render()
})

window.addEventListener('keydown', (e) => {
    // keypress and charCode are deprecated we can instead use keydown & e.key however these respond to all keys not only characters
    const guess = e.key
    word1.makeGuess(guess)

    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = word1.statusMessage

    word1.puzzle.split(/(\s+)/).forEach(word => {
        const spanWord = document.createElement('div')
        puzzleEl.appendChild(spanWord)
        word.split('').forEach(letter => {
            const spanLetter = document.createElement('span')
            spanWord.appendChild(spanLetter)
            spanLetter.textContent = letter
            
            // if space, remove border in css
            if (spanLetter.textContent === ' ') {
                spanLetter.style.setProperty('border-bottom', 'none')
            }
        })
    })
    if (word1.status !== 'playing') {
        const buttons = document.getElementsByClassName('keyboard-button')
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', 'true');
        }
    }   

    // word1.puzzle.split('').forEach((letter) => {
    //     const spanLetter = document.createElement('span')
    //     puzzleEl.appendChild(spanLetter)
    //     spanLetter.textContent = letter
    // })
}

const cleanKeyboard = () => {
    // returns the keyboard keys to the default stylesheet styles
    const buttons = document.getElementsByClassName('keyboard-button')
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled')
        buttons[i].style.background = null
        buttons[i].style.color = null
    }
}

const startGame = async () => {
    const remainingGuessesInput = document.querySelector('#guesses-left').value
    const wordCountInput = document.querySelector('#word-count').value
    puzzleEl.textContent = 'Loading...'
    guessesEl.textContent = ''
    cleanKeyboard()
    const puzzle = await getPuzzle(`${wordCountInput}`)
    word1 = new Hangman(puzzle, remainingGuessesInput)
    
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()