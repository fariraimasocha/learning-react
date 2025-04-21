import React, {useState} from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Button } from './ui/button'

export default function useMemo() {
    const [count, setCount] = useState(0)
    const [multiply, setmultiply] = useState(0) 

    const Increment = () => {
        setCount(count + 1)
    }

    const times = () => {
        const multi = multiply *  2
        console.log(multi)
        setmultiply(multi)
    }

  return (
    <div className='flex justify-center items-center px-6'>
        <div>
            <Card>
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
