import { useNavigate } from 'react-router-dom';


const SinglePendingWager = (wagerData) => {
    const navigate = useNavigate()
    const wager = wagerData.wagerData
    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    const handleCancelButtonClick = () => {
        console.log("cancel button clicked")
        navigate("/myAccount")

    }
    return (
        <div id='single-pending-wager' className="single-wager-info">
            Waiting for {wager.peopleInvolved[1].username} to respond to your wager that {wager.description} by {deadlineDate} <br />
            <button id='cancel-request-button' onClick={ handleCancelButtonClick }>Cancel Request</button>
        </div>
    )
}

export default SinglePendingWager;
