import React from 'react'
import { Card } from './ui/card'

export default function Scrimba() {

const cars = [
  { id: 1, name: "Ford", model: "Mustang" },
  { id: 2, name: "Chevy", model: "Camaro" },
  { id: 3, name: "Dodge", model: "Charger" }
]


  return (
    <div className='px-20 py-20'>
    
        <h1>Render list</h1>
        {
            cars.map((cars) => {
                return (
                <Card key={cars.id} className="w-[300px] h-[200px] m-2 px-2">
                    <h1 className='text-lg'>{cars.name}</h1>
                    <p className='text-lg'>{cars.model}</p>
                </Card>
                )
            })
        }

    </div>
  )
}
