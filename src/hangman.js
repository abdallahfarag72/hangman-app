class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    
    get puzzle() {
        let puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isGoodGuess = this.word.includes(guess)
        const isBadGuess = !isGoodGuess

        const button = document.getElementById(`${guess}`)

        if (this.status !== 'playing') {
            return
        }

        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess]
        }
        
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

        // setup key style for each guess
        if (isUnique && isGoodGuess) {
            button.style.background = '#86f0a1'
            button.style.color = 'black'
            button.setAttribute('disabled', 'true');  
        }

        if (isBadGuess) {
            button.setAttribute('disabled', 'true'); 
        }

       
        this.setStatus()
    }
    
    setStatus() {
        const isEqual = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (isEqual) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    
    get statusMessage() {
        const word = this.word.join('')
        if (this.status === 'playing') {
            return `Guesses Left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${word}".`
        } else {
            return 'Great work! You guessed the word.'
        }
    }

}

export { Hangman as default }
