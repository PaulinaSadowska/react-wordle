import axios from 'axios';

export async function getRandomWord(): Promise<string> {
    return getRandomWordLocal()
}

function random(max: number) : number {
    const min = 0;
    return Math.round(min + Math.random() * (max - min));
}

async function getRandomWordLocal(): Promise<string | any> {
    return axios.get("http://localhost:3000/answers.txt")
    .then((response: any) => {
        const allWords : string[] = response.data.split(" ")
        console.log("len: " + allWords.length)
        return allWords[random(allWords.length - 1)]
    }).catch((error: any) => {
        console.error(error)
    })
}

async function getRandomWordFromApi(): Promise<string> {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: { count: '5', wordLength: '5' },
        headers: {
            'x-rapidapi-host': 'random-words5.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    }
    return axios.request(options).then((response: any) => {
        console.log(response.data)
        return response.data[0]
    }).catch((error: any) => {
        console.error(error)
    })
}


export async function checkWord(word: string): Promise<boolean | any> {
    return axios.get("http://localhost:3000/allWords.txt")
    .then((response: any) => {
        const allWords : string[] = response.data.split("\n")
        const wordLowercase = word.toLocaleLowerCase()
        return allWords.includes(wordLowercase)
    }).catch((error: any) => {
        console.error(error)
    })
}