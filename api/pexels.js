import axios from "axios";



export const getImages = async (searchTerm = "programming") => 
    await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
        headers: {
            Authorization: '563492ad6f91700001000001be5a0534a21043f3aba1798c3bb2ae56',
        },
    });