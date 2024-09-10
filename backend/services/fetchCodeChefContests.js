import axios from "axios";
import * as cheerio from "cheerio";
import Contest from "../models/contest.model.js";


export const fetchCodeChefContests = async () => {
    try {
        const { data } = await axios.get('https://www.codechef.com/contests');
        const $ = cheerio.load(data);

        const contests = [];
        $('table.dataTable tr').each((index, element) => {
            const name = $(element).find('td:nth-child(2) a').text().trim();
            const url = 'https://www.codechef.com' + $(element).find('td:nth-child(2) a').attr('href');
            const startTime = $(element).find('td:nth-child(3)').text().trim();
            const endTime = $(element).find('td:nth-child(4)').text().trim();

            if (name && startTime && endTime) {
                const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60); 

                contests.push({
                    platform: 'CodeChef',
                    name,
                    url,
                    startTime: new Date(startTime),
                    duration,
                });
            }
        });

        await Contest.insertMany(contests);
    } catch (error) {
        console.error('Error fetching CodeChef contests:', error);
    }
}