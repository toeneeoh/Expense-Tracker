import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;

class ApiService {
    constructor() {
        this.baseUrl = apiUrl
    }

    async processText(text) {
        try {
            const response = await fetch(`${this.baseUrl}/text/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

        // Log the raw response for debugging
        const rawResponse = await response.text(); // Use .text() to get the raw response
        console.log('Raw API Response:', rawResponse); // Log the response

        // Now parse it as JSON
        const jsonResponse = JSON.parse(rawResponse); // Manually parse it

        return jsonResponse; // Return the parsed JSON
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Add more methods for other types of processing
}

export default new ApiService();