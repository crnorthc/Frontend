import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Dropdown from '../../../components/listbox'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { login } from "../../../store/actions/admin"
import Router from "next/router"
import { createGame } from "../../../store/actions/admin"

const leagues = [
    { insert: 'Stocks', value: 'Stocks' },
    { insert: 'Cryptos', value: 'Cryptos' },
    { insert: 'Both', value: 'Both' },
]

const durations = [
    { insert: 'Hour', value: 'Hour' },
    { insert: 'Day', value: 'Day' },
    { insert: 'Week', value: 'Week' },
	{ insert: 'Quarter', value: 'Quarter' },
	{ insert: 'Custom', value: 'Custom' },
]

const quarters = [
    { insert: 'Q1', value: 'Q1' },
    { insert: 'Q2', value: 'Q2' },
    { insert: 'Q3', value: 'Q3' },
	{ insert: 'Q4', value: 'Q4' },
]

const TieredSplit = [
    { insert: 'Top Player', value: 'Top Player' },
    { insert: 'Top 3 Players', value: 'Top 3 Players' },
    { insert: 'Top 5 Players', value: 'Top 5 Players' },
	{ insert: 'Top 10 Players', value: 'Top 10 Players' },
]

const MultiplierSplit = [
    { insert: 'Top 10%', value: 'Top 10%' },
    { insert: 'Top 40%', value: 'Top 40%' },
]

const Create: NextPage = (props: any) => {
	const [tiered, setType] = useState(true);
 	const [name, setName] = useState("");
	const [bet, setBet] = useState(0)
	const [league, setLeague] = useState(leagues[0])
	const [split, setSplit] = useState(TieredSplit[0])
	const [duration, setDuration] = useState(durations[0])
	const [quarter, setQuarter] = useState(quarters[0])
	const [startDate, setStartDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endDate, setEndDate] = useState('')
	const [endTime, setEndTime] = useState('')
	

	Create.propTypes = {
        createGame: PropTypes.func.isRequired,
    }

	const getDate = () => {
		var startMonth = Number(startDate.substring(5, 7))
		var startDay = Number(startDate.substring(8))
		var startYear = Number(startDate.substring(0, 4))
		var startHour = Number(startTime.substring(0, 2))
		var startMin = Number(startTime.substring(3))

		var date = {
			start: {
				year: startYear,
				month: startMonth,
				day: startDay,
				hour: startHour,
				minute: startMin
			}
		}

		if (duration.value == "Custom") {
			var endMonth = Number(endDate.substring(5, 7))
			var endDay = Number(endDate.substring(8))
			var endYear = Number(endDate.substring(0, 4))
			var endHour = Number(endTime.substring(0, 2))
			var endMin = Number(endTime.substring(3))	
			date['end'] = {
				year: endYear,
				month: endMonth,
				day: endDay,
				hour: endHour,
				minute: endMin
			}		
		}

		return date
	}


	useEffect(() => {
		if (tiered) {
			setSplit(TieredSplit[0])
		}
		else {
			setSplit(MultiplierSplit[0])
		}
	}, [tiered])

	const handleSubmit = () => {
		if (duration.value == 'Quarter') {
			var date: any = quarter
		}
		else {
			date = getDate()
		}

		var type = 'multiplier'

		if (tiered) {
			type = 'tiered'
		}

		var game = {
			name: name,
			type: type,
			league: league.value,
			split: split.value,
			bet: bet,
			duration: duration.value,
			date: date
		}
		props.createGame(game)
	}

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-col justify-center items-center w-full pt-12 h-full'>
			<h1 className="text-light pb-10 text-4xl">Create Game</h1>
				<div className=" border-2 rounded-lg border-primary flex w-3/4 flex-col items-center justify-between">       
					{tiered ? 
							<div className="flex w-full  flex-row justify-between items-center">
								<button onClick={() => setType(true)} className={"text-dark border-b-2 py-4 border-r-2 border-primary bg-primary text-xl w-1/2"}>Tiered</button>
								<button onClick={() => setType(false)} className={"text-light border-b-2 border-primary hover:bg-medium py-4 bg-dark text-xl w-1/2"}>Multiplier</button>
							</div>
							:
							<div className="flex w-full  flex-row justify-between items-center">
								<button onClick={() => setType(true)} className={"text-light border-b-2 py-4 border-r-2 border-primary hover:bg-medium bg-dark text-xl w-1/2"}>Tiered</button>
								<button onClick={() => setType(false)} className={"text-dark border-b-2 border-primary py-4 bg-primary text-xl w-1/2"}>Multiplier</button>
							</div>
					}                                 
					<div className="flex bg-dark flex-col w-full">
						<div className="grid w-full mt-8 gap-5 grid-cols-12">
							<div className="col-span-6 col-start-2">
								<h1 className="text-light text-lg">Name</h1>
								<input
									type='text'
									className='border w-full bg-light focus:outline-none border-grey-light p-3 rounded-lg poppins'
									value={name}
									onChange={(e) => setName(e.target.value)}
									autoComplete="on"
									placeholder='Name'
									/>		
							</div>		
							<div className="col-span-4">
								<h1 className="text-light text-lg">Bet</h1>
								<input
									type='number'
									className='border w-full bg-light focus:outline-none border-grey-light p-3 rounded-lg poppins'
									autoComplete="on"
									onChange={(e) => setBet(Number(e.target.value))}
									placeholder='ex. $10'
									/>
							</div>																							
						</div>
						<div className="grid w-full mt-8 gap-5 grid-cols-12">
							<div className="col-span-5 col-start-2">
								<h1 className="text-light text-lg">League</h1>
								<Dropdown value={league} values={leagues} setValue={setLeague}/>
							</div>
							<div className="col-span-5">
								<h1 className="text-light text-lg">Split Type</h1>
								{tiered ? 
									<Dropdown value={split} values={TieredSplit} setValue={setSplit}/>
									:
									<Dropdown value={split} values={MultiplierSplit} setValue={setSplit}/>	
								}								
							</div>
						</div>											
						<div className="grid w-full mt-8 justify-center grid-cols-12 gap-5">						
							<div className="col-span-5 col-start-2">
							<h1 className="text-light text-lg">Duration</h1>
								<Dropdown value={duration} values={durations} setValue={setDuration}/>
							</div>	
							<div className="col-span-5">
								<h1 className="text-light text-lg">{duration.value == 'quarter' ? 'Quarter' : duration.value == "Custom" ? null : 'Start'}</h1>
								{duration.value == 'Quarter' ? 
									<Dropdown value={quarter} values={quarters} setValue={setQuarter}/>
									:
										duration.value == "Custom" ?
											null
											:
										<div className="flex flex-row items-center justify-start space-x-2">
											<input
												className="flex-1 bg-light py-4 rounded-lg text-sm block px-2 shadow-md border-transparent focus:outline-none focus:ring focus:ring-primary"
												type="date"
												value={startDate}
												onChange={(e) => setStartDate(e.target.value)}
											/>
											<input
												className="flex-1 bg-light text-sm block px-2 py-4 shadow-md border-transparent rounded-lg focus:outline-none focus:ring focus:ring-primary"
												type="time"
												value={startTime}
												onChange={(e) => setStartTime(e.target.value)}
											/>
										</div>
								}
							</div>							
						</div>
						{ duration.value == "Custom" ?
							<div className="grid w-full mt-8 justify-center grid-cols-12 gap-5">						
								<div className="col-span-5 col-start-2">
									<h1 className="text-light text-lg">Start</h1>
									<div className="flex flex-row items-center justify-start space-x-2">
										<input
											className="flex-1 bg-light py-4 rounded-lg text-sm block px-2 shadow-md border-transparent focus:outline-none focus:ring focus:ring-primary"
											type="date"
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
										/>
										<input
											className="flex-1 bg-light text-sm block px-2 py-4 shadow-md border-transparent rounded-lg focus:outline-none focus:ring focus:ring-primary"
											type="time"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
										/>
									</div>
								</div>	
								<div className="col-span-5">
									<h1 className="text-light text-lg">End</h1>
									<div className="flex flex-row items-center justify-start space-x-2">
										<input
											className="flex-1 bg-light py-4 rounded-lg text-sm block px-2 shadow-md border-transparent focus:outline-none focus:ring focus:ring-primary"
											type="date"
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
										/>
										<input
											className="flex-1 bg-light text-sm block px-2 py-4 shadow-md border-transparent rounded-lg focus:outline-none focus:ring focus:ring-primary"
											type="time"
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
										/>
									</div>
								</div>	
							</div>
							:
							null
						}						
						
						<div className="w-full flex mt-8 flex-row justify-center">
							<button onClick={() => handleSubmit()} className="w-1/3 mb-8 py-4 bg-secondary hover:bg-secondaryLight rounded-lg">Submit</button>
						</div>
					</div>
                </div>
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	
})

export default connect(mapStateToProps, { createGame })(Create)
