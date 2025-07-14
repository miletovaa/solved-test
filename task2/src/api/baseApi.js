import axios from 'axios'

export const fetchData = async (endpoint) => {
    const url = "https://jsonplaceholder.typicode.com"

    if (!endpoint) {
        throw new Error('Endpoing is required for API call')
    }

    // I prefer to use axios for cleaner syntax
    return axios.get(`${url}/${endpoint}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })
}