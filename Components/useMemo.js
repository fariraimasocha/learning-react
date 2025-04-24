import React, { useMemo, useState} from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function UseMemo() {
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState(0)

    const multiply = useMemo(() =>  
        count * number
    , [count, number])

    const Increment = () => {
        setCount(count + 1)
        console.log("count is", count)
    }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div>
            <Input type="number" value={number} onChange={(e) => ( setNumber(e.target.value))} />
            <Card className="w-72 px-3 mt-4">
                <CardTitle className="px-5">Count: {count}</CardTitle>
                <CardContent>
                    <h1>Multiply: {multiply}</h1>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={Increment}>
                    Increment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}
