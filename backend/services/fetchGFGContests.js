import axios from "axios";
import Contest from "../models/contest.model.js";
import * as cheerio from "cheerio";


export const fetchGFGContests = async () => {
    try {
        const { data } = await axios.get('https://practice.geeksforgeeks.org/contest');
        const $ = cheerio.load(data);

        const contests = [];

        $('.contest-card').each((index, element) => {
            const name = $(element).find('.card-title').text().trim();
            const url = 'https://practice.geeksforgeeks.org' + $(element).find('a').attr('href');
            const startTime = $(element).find('.contest-duration').text().trim();

            if (name && startTime) {
                contests.push({
                    platform: 'GeeksforGeeks',
                    name,
                    url,
                    startTime: new Date(startTime),
                    duration: 120, 
                });
            }
        });

        await Contest.insertMany(contests);
    } catch (error) {
        console.error('Error fetching GFG contests:', error);
    }
}