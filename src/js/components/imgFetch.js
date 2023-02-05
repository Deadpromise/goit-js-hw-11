import axios from 'axios'

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33394592-7a504d3bc202d5308ca79ee73';

export default async function getImgs(inputData, page) {
    try {
        const config = {
            method: 'GET',
            url: BASE_URL,
            params: {
                key: API_KEY,
                q: inputData,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: page, 
                per_page: 40,
            },
        };
        const response = await axios(config);
        console.log(response.data);
        // console.log(response.data.totalHits);
        return response.data;
    } catch (error) {
        console.log(error);
    }
} 