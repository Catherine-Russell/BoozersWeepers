const SingleResolvedWager = (wagerData) => {
  const wager = wagerData.wagerData
    return (
        <div id='resolved-wager-information' className='single-wager-info'>
        <>This wager is finished and the person who won is {wager.winner.username}</>
      
        </div>
      )
}

export default SingleResolvedWager;
