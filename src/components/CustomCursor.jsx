import React, { useState, useEffect } from 'react'
import { Cursor } from '../styles/reusableStyle'
import { useGlobalStateContext } from '../context/globalContext'

const CustomCursor = () => {

    // # Get cursor type
    const { cursorType } = useGlobalStateContext()

    // # State
    const [mousePosition, setMousePosition] = useState({
        x: 400,
        y: 400
    })
    // console.log(mousePosition);


    const onMouseMove = e => {
        const { pageX: x, pageY: y } = e
        setMousePosition({ x, y })
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <>
            <Cursor
                className={`${!!cursorType ? 'hovered' : ''} ${cursorType}`}
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`
                }} />
        </>
    )
}

export default CustomCursor
