import axios from "axios";
import * as cheerio from "cheerio";
import Contest from "../models/contest.model.js";

export const fetchLeetCodeContests = async () => {
    try {
        const { data } = await axios.get('https://leetcode.com/contest/');
        const $ = cheerio.load(data);

        const contests = [];

        $('.contest-card').each((index, element) => {
            const name = $(element).find('.contest-title').text().trim();
            const url = 'https://leetcode.com' + $(element).find('a').attr('href');
            const startTime = $(element).find('.text-label-1').text().trim();

            if (name && startTime) {
                contests.push({
                    platform: 'LeetCode',
                    name,
                    url,
                    startTime: new Date(startTime),
                    duration: 90, 
                });
            }
        });

        await Contest.insertMany(contests);
    } catch (error) {
        console.error('Error fetching LeetCode contests:', error);
    }
}