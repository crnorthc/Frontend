import React, { useState } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import ChartModal from './searchModal'


// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getData } from "../store/actions/game"


const Lineup = (props) => {
    const [open, setOpen] = useState(false)

	Lineup.propTypes = {
        getData: PropTypes.func.isRequired,
        game: PropTypes.object,
        player: PropTypes.object,
        data: PropTypes.array
    }

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const get_lineup = () => {
        const lineup = props.player.lineup
        var temp = []
        for (const x in lineup) {
            temp.push(
                <div className="flex flex-row py-4 pl-8 pr-4 justify-between items-center">
                    <div className="flex flex-row items-center">
                        {lineup[x].logo == null ? <Image alt='' width={50} height={50} src='/NoLogo.svg' /> :<Image alt='' width={50} height={50} src={lineup[x].logo} />}
                        <h1 className='text-xl pl-4 pr-2 pb-0 pr-2 text-light'>{lineup[x].name}</h1>
                        <h1 className='text-md font-light text-light'>{lineup[x].symbol}</h1>
                    </div>  
                    <div className="flex flex-col items-end">
                        <h1 className='text-xl text-light'>{toMoney(lineup[x].current_value)}</h1>
                        <div className={"flex flex-row items-center " + `${lineup[x].d_change > 0 ? 'text-green' : 'text-red'}`}>
                            <h1 className='text-md'>{toMoney(lineup[x].d_change)}</h1> 
                            <h1 className='text-md ml-2'>{lineup[x].p_change}%</h1>
                        </div>                        
                    </div>                                    
                </div>
            )
        }
        return temp
    }

	return (
		<div className="w-full mr-8"> 
            {open ? 
                <div className="absolute z-40 top-0 left-0 bg-lightHover w-full h-full">
                    <div className="pageCont">
                        <ChartModal setOpen={setOpen}/> 
                    </div>                    
                </div>                
                : null
            }         
			<main className='bg-medium flex flex-col items-center w-full'>
                <div className="flex flex-col items-center justify-center w-full">
                    {props.player == null ?
                        <Loader
                            type="Circles"
                            color="#00C2EF"
                            height={50}
                            width={50}
                        />
                        :
                        <div className="flex flex-col w-full border-b-2 border-r-2 border-l-2 border-primary max-h-lg overflow-y-auto rounded-b-xl">
                            {get_lineup() }
                        </div>    
                    }                                                                             
                </div>
			</main>
		</div>
	)
}

const mapStateToProps = (state) => ({
    game: state.game.game,
    player: state.game.player,
    data: state.game.data
})

export default connect(mapStateToProps, { getData })(Lineup)
