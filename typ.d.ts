interface Signup {
    first_name: string, 
    last_name: string, 
    phone: string, 
    password: string, 
    username: string
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
    league: string,     // "stocks", "crypto", "stocks&crypto"  only three options 
    duration: string,   // "day", "week", "month"
    start: object,         // "{ month, day, year, hour, minute}"
    game_type: string,     // "multiplier", "tiered"
    split: string,         // "top player", "top 5", "top 10", "top 10%", "top 40%"
    bet: number              // multiplier it will be only bet, for tiered it will represent bronze level bet 
}