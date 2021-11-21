import React, { useState, useEffect } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { remove } from "../store/actions/notify"


const Notify: any = (props: any) => {
    const [notes, setNotes]: any = useState([])
    const [reload, setReload] = useState(true)

	Notify.propTypes = {
        remove: PropTypes.func.isRequired,
        notes: PropTypes.array
    }

    const handleRemove = () => {
        props.remove()
        setReload(true)
    }

    useEffect(() => {
        var temp = []
        for (const note in props.notes) {
            temp.push(
                <div className="note absolute w-lg h-sm bg-notify rounded-lg bottom-6 ml-6"> 
                    <div className="w-full flex flex-row justify-end mt-2 pr-2">
                        <button onClick={() => handleRemove()} className="font-bold text-white w-6 h-6 bg-redHue rounded-full">
                            &#x2715;
                        </button>
                    </div>
                    <div className="h-full w-full px-8 text-center text-light -mt-8 flex flex-row justify-center items-center">
                        {props.notes[note]}
                    </div>          
                </div>
            )
        }
        setNotes(temp)
    }, [props.notes])

    if (reload) {
        var temp = []
        for (const note in props.notes) {
            temp.push(
                <div className="note absolute w-lg h-sm bg-notify rounded-lg bottom-6 ml-6"> 
                    <div className="w-full flex flex-row justify-end mt-2 pr-2">
                        <button onClick={() => handleRemove()} className="font-bold text-white w-6 h-6 bg-redHue rounded-full">
                            &#x2715;
                        </button>
                    </div>
                    <div className="h-full w-full px-8 text-center text-light -mt-8 flex flex-row justify-center items-center">
                        {props.notes[note]}
                    </div>          
                </div>
            )
        }
        setNotes(temp)
        setReload(false)
    }

	return (
        <>
            {notes}
        </>
	)
}

const mapStateToProps = (state: any) => ({
    notes: state.notify.notes
})

export default connect(mapStateToProps, { remove })(Notify)
