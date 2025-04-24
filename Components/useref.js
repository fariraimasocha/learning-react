import React, { useState, useEffect, useRef} from 'react'
import { Input } from './ui/input'
import { Card, CardDescription, CardFooter } from './ui/card'

export default function UseRef() {
    const [name, setName] = useState('')
    const renderCount = useRef(0)

    useEffect(() => {

    },[])
  return (
    <div className='flex justify-center items-center h-screen'>
        <div>
            <Card>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <CardFooter>
                <h1>{name}</h1>
            </CardFooter>
            </Card>
        </div>
        </div>
  )
}
