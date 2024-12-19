export class Details {
    constructor(gameId) {
        this.myGameId = gameId;
    }
    async getApiDetails() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'b1724ba667msh7691d8a8b02f78cp1a8342jsn5793579be012',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            let promiseDetails = await fetch(
                `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.myGameId}`,
                options
            );
            let responseDetails = await promiseDetails.json();
            console.log(responseDetails);
            return responseDetails;
        } catch (error) {
            console.error(error);
        }
    }
}
