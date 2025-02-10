import axios from 'axios';

const fetchUserName = async (token) => {
    try {
        const response = await axios.post('https://vercel-back-seven.vercel.app/getUserName', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.name;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        return null;
    }
};

export default fetchUserName;
