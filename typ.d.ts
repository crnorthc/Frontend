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
    league: string,
    duration: string,
    start: any,
    split: string,
    bet: any
}