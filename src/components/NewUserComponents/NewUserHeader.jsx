import React from 'react'
import MilestonesLogo from "../../assets/MilestonesLogo.svg"

const NewUserHeader = () => {
  return (
     <div className = "flex flex-col w-full ">
            <div className = "flex flex-row mt-[24px] mx-[72px] items-center">
                <img src = {MilestonesLogo}/>
                <div className = "text-[#1D4ED8] text-xl font-bold w-[120px]">Milestones</div>
            </div>
    </div>
  )
}

export default NewUserHeader