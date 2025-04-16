import React from 'react'
import { Card } from './ui/card'

export default function Scrimba() {

const cars = [
  { id: 1, name: "Ford", model: "Mustang" },
  { id: 2, name: "Chevy", model: "Camaro" },
  { id: 3, name: "Dodge", model: "Charger" },
  { id: 4, name: "Toyota", model: "Supra" },
  { id: 5, name: "Nissan", model: "Skyline" },
  { id: 6, name: "Mazda", model: "RX-7" },
  { id: 7, name: "Subaru", model: "WRX" },
  { id: 8, name: "Mitsubishi", model: "Eclipse" },
  { id: 9, name: "Honda", model: "Civic" },
  { id: 10, name: "Volkswagen", model: "GTI" }
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
