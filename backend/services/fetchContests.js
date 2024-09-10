import { fetchCodeChefContests } from "./fetchCodeChefContests.js";
import { fetchCodeForcesContests } from "./fetchCodeForcesContests.js"
import { fetchGFGContests } from "./fetchGFGContests.js";
import { fetchLeetCodeContests } from "./fetchLeetcodeContests.js";


export const fetchAllContests = async () => {
    await fetchCodeForcesContests();
    await fetchCodeChefContests();
    await fetchGFGContests();
    await fetchLeetCodeContests();
}