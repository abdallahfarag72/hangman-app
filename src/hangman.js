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
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== 'playing') {
            return
        }

        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess]
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
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
