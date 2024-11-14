import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;

class ApiService {
    constructor() {
        this.baseUrl = apiUrl
    }

    //update recommendations screen whenever needed, i.e. when recommendations screen is refreshed
    async updateRecommendations(recUpdateString) {
        //return a JSON file with top 3 recommendations based on userData
        //sends TO backend updated list of "blacklisted" recommendations refused by user, a string of numbers to be parsed by python at start of function

        try {
            const response = await fetch(`${this.baseUrl}/recommendations/update`, { //change to proper python script file?
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recUpdateString })
            });
            //get a sorted array from backend database: python should sort recommendations based upon userData

            // Log the raw response for debugging
            const rawResponse = await response.text(); // Use .text() to get the raw response
            console.log('Raw API Response:', rawResponse); // Log the response

            // Now parse it as JSON
            const jsonResponse = JSON.parse(rawResponse); // Should parse 3 titles and 3 descriptions

            return jsonResponse;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    //push new data from settings screen to backend API, doesn't return anything
    //takes a JSON "dataUpdates" with any keys that should be updated, ignores any keys not included
    async pushUserData(dataUpdates) {
        try {
            const response = await fetch(`${this.baseUrl}/text/process`, { //change to proper python script file, wherever new data has to be pushed to
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: dataUpdates //body/dataUpdates is just a JSON object
            });

            //if anything needs to be logged or parsed, do it here
        }
        catch (error) {
            console.error('API Error:', error);
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

    //attempts to check username to see if it matches any data in database
    //testUser always works for testing purposes, even if database can't be accessed
    //TODO: check password as well
    //TODO: can also use email in place of username?
    //returns username if successful, "-1" if not
    //test user - userName : Johndoe, password : 1234
    async loginAttempt(username, password) {
        if (username == "Johndoe") {
            //test user
            return "Johndoe";
        }
        else if (false) {
            //real user
            //query database, returning username if user can be found
        } else {
            return "-1";
        }
    }
    // Get a specific item from the database

    async getFromDatabase(item, username) {
        try {
            const response = await fetch(`${this.baseUrl}/database/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item, username })
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