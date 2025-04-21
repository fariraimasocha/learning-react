import React, {useMemo, useState} from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Button } from './ui/button'

export default function UseMemo() {
    const [count, setCount] = useState(0)

    const multiply = useMemo(() => 
        count * 2
    , [count])


    const Increment = () => {
        setCount(count + 1)
        console.log("count is", count)
    }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div>
            <Card className="w-72 px-3">
                <CardTitle>Count: {count}</CardTitle>
                <CardContent>
                    <h1>Multiply: {multiply}</h1>
                </CardContent>
                <CardFooter>
                    <Button onClick={Increment}>
                    Increment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}
