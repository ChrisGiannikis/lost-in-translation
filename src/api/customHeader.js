const apiKey = process.env.REACT_APP_API_KEY //taking the api key from enviromental virables

export const createHeaders = () => {
    return {
        'Content-Type' : 'application/json',
        'x-api-key' : apiKey
    }
}