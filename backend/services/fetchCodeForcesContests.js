import axios from "axios"
import Contest from "../models/contest.model.js";

export const fetchCodeForcesContests = async () => {
    try {
        const { data } = await axios.get('https://codeforces.com/api/contest.list?gym=false');
        const contests = data.result.filter(contest => contest.phase === 'BEFORE');
        const formattedContests = contests.map(contest => ({
            platform: 'Codeforces',
            name: contest.name,
            url: `https://codeforces.com/contests/${contest.id}`,
            startTime: new Date(contest.startTimeSeconds * 1000),
            duration: contest.durationSeconds / 60,
        }));
        await Contest.insertMany(formattedContests);
    } catch (error) {
        console.error('Error fetching Codeforces contests:', error);
    }
}