import React from 'react'

export const TitleHeader = ({ title }: { title: string }) => {
  return (
    <div className="my-20">
      <div className="flex items-center">
        <h2 className="font-bold text-4xl text-white">{title}</h2>
        <img src="/img/arrow-donw.png" alt="" className="ml-4" />
      </div>
    </div>
  )
}

