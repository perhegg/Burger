import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-react-1190f-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance