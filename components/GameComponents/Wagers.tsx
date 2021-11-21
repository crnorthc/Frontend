import React, { useState, useEffect } from "react"
import Image from "next/image"

const BONUS = {
    'diamond': '100%',
    'gold': '75%',
    'silver': '50%',
    'bronze': '25%',
    'ghost': '0%'
}

const Wagers: any = (props: any) => {
    const [tier, setTier]: any = useState('ghost')
    const [multi, setMulti] = useState('multi')

    const BET = {
        'diamond': (4 * props.game.bet),
        'gold': (3 * props.game.bet),
        'silver': (2 * props.game.bet),
        'bronze': (props.game.bet),
        'ghost': (0)
    }

    useEffect(() => {
        if (props.game.type != 'tiered') {
            if (props.player.balance <= props.game.bet) {
                setMulti('ghost')
            }
        }
    }, [])

    const handleTier = () => {
        if (props.game.type == 'tiered') {
            props.join(props.game.code, tier)
        }        
        else {
            if (multi == 'multi') {
                props.join(props.game.code, props.game.bet)
            }
            else {
                props.join(props.game.code, 0)
            }
        }
        props.setEdit(false)
    }

    const get_tiers = () => {
        var temp = []
        for (const t in BET) {
            if (props.player.balance >= BET[t]) {
                if (BET[t] > BET[tier]) setTier(t)                
            }
            temp.push(
                <>
                    {props.player.balance >= BET[t] ? 
                        <button onClick={() => setTier(t)} className={`${tier == t ? 'border-2' : ''} border-primary bg-dark hover:bg-darkHover pb-4`}>
                            <h1 className="text-xl my-4 font-extralight text-light">{t[0].toUpperCase() + t.substring(1)}</h1>
                            <Image height={60} width={60}  src={"/tiers/" + t + ".png"} alt="" />
                        </button>
                        :
                        <button onClick={() => props.notify('Not Enough Funds')} className="border-primary bg-dark hover:bg-darkHover pb-4">
                            <h1 className="text-xl my-4 font-extralight text-lightmedium">{t[0].toUpperCase() + t.substring(1)}</h1>
                            <Image className='opacity-30' height={60} width={60}  src={"/tiers/" + t + ".png"} alt="" />
                        </button>
                    }                    
                </>
            )
        }

        return temp
    }
    
    if (props.game.type == 'tiered') {
        return (
            <div className="flex w-2/3 h-md flex-col items-center justify-between">
                <div className="grid grid-cols-5 w-full gap-4">
                    {get_tiers()}
                </div>
                <div className="flex flex-row justify-between my-10 px-8 py-2 w-full bg-dark">
                    <div className="flex flex-row items-center">
                        <h1 className="text-xl pr-2 text-lightmedium">Your Wager:</h1>
                        <h1 className="text-2xl font-semibold text-light">{"$" + BET[tier]}</h1>
                    </div>
                    <div className="flex flex-row items-center">
                        <h1 className="text-xl pr-2 text-lightmedium">Your Bonus:</h1>
                        <h1 className="text-2xl font-semibold text-light">{BONUS[tier]}</h1>
                    </div>                    
                </div>
                <button onClick={() => handleTier()} className="bg-secondary w-1/3 hover:bg-secondaryLight text-lg text-light rounded-xl py-2 px-8">{props.edit ? "Confirm" : "Join"}</button>
            </div>
        )
    }
    else {
        return (
            <div className="flex w-2/3 h-md flex-col items-center justify-between">
                <div className="grid grid-cols-2 w-1/2 gap-4">
                    {props.player.balance >= props.game.bet ? 
                        <button onClick={() => setMulti('multi')} className={`${multi == 'multi' ? 'border-2' : ''} border-primary bg-dark hover:bg-darkHover pb-4`}>
                            <h1 className="text-xl my-4 font-extralight text-light">Multiplier</h1>
                            <Image height={60} width={60}  src={props.game.split == 'top 40' ? "/TwoX.svg" : "/EightX.svg"} alt="" />
                        </button>
                        :
                        <button onClick={() => props.notify('Not Enough Funds')} className={`${multi == 'multi' ? 'border-2' : ''} border-primary bg-dark hover:bg-darkHover pb-4`}>
                            <h1 className="text-xl my-4 font-extralight text-lightmedium">Multiplier</h1>
                            <Image className='opacity-30' height={60} width={60}  src={props.game.split == 'top 40' ? "/TwoX.svg" : "/EightX.svg"} alt="" />
                        </button>
                    }                      
                    <button onClick={() => setMulti('ghost')} className={`${multi == 'ghost' ? 'border-2' : ''} border-primary bg-dark hover:bg-darkHover pb-4`}>
                        <h1 className="text-xl my-4 font-extralight text-light">Ghost</h1>
                        <Image height={60} width={60}  src="/tiers/ghost.png" alt="" />
                    </button>  
                </div>
                <div className="flex flex-row justify-between my-10 px-8 py-2 w-full bg-dark">
                    <div className="flex flex-row items-center">
                        <h1 className="text-xl pr-2 text-lightmedium">Your Wager:</h1>
                        <h1 className="text-2xl font-semibold text-light">{multi == 'multi' ? ("$" + props.game.bet) : '$0'}</h1>
                    </div>
                    <div className="flex flex-row items-center">
                        <h1 className="text-xl pr-2 text-lightmedium">Your Take:</h1>
                        <h1 className="text-2xl font-semibold text-light">${props.game.split == "top 40" && multi == "multi" ? (props.game.bet * 2) : multi == "ghost" ? "0" : (props.game.bet * 8)}</h1>
                    </div>                    
                </div>
                <button onClick={() => handleTier()} className="bg-secondary w-1/3 hover:bg-secondaryLight text-lg text-light rounded-xl py-2 px-8">{props.edit ? "Confirm" : "Join"}</button>
            </div>
        )
    }
}


export default Wagers
