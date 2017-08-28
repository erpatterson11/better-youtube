import axios from 'axios'

export function videoSearch(searchTerm) {
    return axios.get( `http://localhost:3001/api/youtube/video?searchTerm=${searchTerm}` )
        .then( res => res.data.items )

}