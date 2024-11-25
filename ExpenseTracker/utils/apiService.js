import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;

class ApiService {
    constructor() {
        this.baseUrl = apiUrl
    }

    async updateRecommendations(username) {
        try {
            // Fetch the existing recommendations for the user
            const getResponse = await fetch(`${this.baseUrl}/recommendations/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const getRawResponse = await getResponse.text();
            console.log('Raw Get Recommendations Response:', getRawResponse);

            const getJsonResponse = JSON.parse(getRawResponse);

            // Validate the response to ensure recommendations exist and are not null
            const validRecommendations = getJsonResponse.recommendations && getJsonResponse.recommendations.every(
                (rec) => rec.title && rec.description
            );

            if (validRecommendations) {
                // Return existing recommendations if valid
                return {
                    rec1: getJsonResponse.recommendations[0],
                    rec2: getJsonResponse.recommendations[1],
                    rec3: getJsonResponse.recommendations[2],
                };
            }

            // If no recommendations exist, generate new ones
            const generateResponse = await fetch(`${this.baseUrl}/recommendations/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const generateRawResponse = await generateResponse.text();
            console.log('Raw Generate Recommendations Response:', generateRawResponse);

            const generateJsonResponse = JSON.parse(generateRawResponse);

            if (generateJsonResponse.recommendations) {
                return {
                    rec1: generateJsonResponse.recommendations[0],
                    rec2: generateJsonResponse.recommendations[1],
                    rec3: generateJsonResponse.recommendations[2],
                };
            } else {
                throw new Error('Failed to generate recommendations.');
            }
        } catch (error) {
            console.error('API Error in updateRecommendations:', error);
            throw error;
        }
    }

    //generate a new message from ChatGPT to send to the user on the messages screen
    //a message should just be a JSON file containing a single string
    async generateMessage(text) {
        try {
            const response = await fetch(`${this.baseUrl}/text/prompt`, { //change to proper python script file?
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });
            //response should just be the string returned from ChatGPT

            const rawResponse = await response.text(); // Use .text() to get the raw response
            console.log('Raw API Response:', rawResponse); // Log the response

            // Now parse it as JSON
            const jsonResponse = JSON.parse(rawResponse); // Should parse 3 titles and 3 descriptions

            return jsonResponse;
        }
        catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Push item with value to the database
    async pushToDatabase(item, value, username, table) {
        try {
            const response = await fetch(`${this.baseUrl}/database/push`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item, value, username, table })
            });

            const rawResponse = await response.text();
            const jsonResponse = JSON.parse(rawResponse);

            return jsonResponse;
        }
        catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Get a specific item from the database
    async getFromDatabase(item, username, table) {
        try {
            const response = await fetch(`${this.baseUrl}/database/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item, username, table })
            });

            const rawResponse = await response.text();
            const jsonResponse = JSON.parse(rawResponse);

            return jsonResponse;
        }
        catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Insert a row into the database
    async insertRow(data, table) {
        try {
            const response = await fetch(`${this.baseUrl}/database/insert_row`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table, data })
            });

            const rawResponse = await response.text();
            const jsonResponse = JSON.parse(rawResponse);

            return jsonResponse;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Test a username and password in the DB
    async checkUserCredentials(username, password) {
        try {
            const response = await fetch(`${this.baseUrl}/database/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const rawResponse = await response.text();
            const jsonResponse = JSON.parse(rawResponse);

            return jsonResponse;
        }
        catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }


        

    // Add more methods for other types of processing
}

export default new ApiService();