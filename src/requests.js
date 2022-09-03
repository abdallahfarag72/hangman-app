const getPuzzle = async (wordCount) => {
    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Cannot fetch puzzle') 
    }
}


export { getPuzzle as default }




// the code below is not used in the application it was for educational purposes only

// const getPuzzleOld = (wordCount) => {
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Cannot fetch puzzle')
//         }
//     }).then((data) => {
//         return data.puzzle
//     })
// }


// Countries API
const getCountry = async (countryCode) => {
    const response = await fetch('//api.countrylayer.com/v2/all?access_key=f13d645c791a7ecab3e062fe6ca4c046')
    
    if (response.status === 200) {
        const data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    } else {
        throw new Error('Unable to fetch data')
    }
}




// IP API
const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=11e2254110bccd')

    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Unable to fetch data')
    }   
}



const getCurrentCountry = async () => {
    const location = await getLocation()
    const country = await getCountry(location.country)
    return country
}