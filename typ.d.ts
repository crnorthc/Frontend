interface Signup {
    first_name: string, 
    last_name: string, 
    phone: string, 
    password: string, 
    username: string,
    birthday: object,
    email: string
}

interface AdminSignup {
    first_name: string, 
    last_name: string, 
    key: string, 
    password: string, 
    username: string
}

interface Game {
    name: string,
    type: string,
    code: string,
    league: string,     // "stocks", "crypto", "stocks&crypto"  only three options 
    duration: string,   // "day", "week", "month"
    start: object,         // "{ month, day, year, hour, minute}"
    end: object,
    split: string,         // "top player", "top 5", "top 10", "top 10%", "top 40%"
    players: number,
    bet: number              // multiplier it will be only bet, for tiered it will represent bronze level bet 
}

declare module 'coingecko-api';
