import React, { useEffect, useRef } from 'react'

// Context
import { useGlobalStateContext } from '../../context/globalContext'

// Custom hooks
import useWindowSize from '../../hooks/useWindowSize'

// Styles
import {
    Banner,
    BannerTitle,
    Canvas,
    Headline,
    Video
} from './homeStyles'


const HomeBanner = ({ onCursor }) => {

    // # Get theme
    const { currentTheme } = useGlobalStateContext()
    console.log(currentTheme);

    // # Ref
    let canvas = useRef(null)

    // # Get window size
    const size = useWindowSize()
    console.log(size);


    // ? : I don't know at all.
    useEffect(() => {

        let renderingElement = canvas.current
        let drawingElement = renderingElement.cloneNode()

        let drawingContext = drawingElement.getContext('2d')
        let renderingContext = renderingElement.getContext('2d')

        let lastX
        let lastY

        let moving = false

        renderingContext.globalCompositeOperation = 'source-over'
        renderingContext.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff'
        renderingContext.fillRect(0, 0, size.width, size.height)


        renderingElement.addEventListener('mouseover', e => {
            moving = true
            lastX = e.pageX - renderingElement.offsetLeft
            lastY = e.pageY - renderingElement.offsetTop
        })

        renderingElement.addEventListener('mouseup', e => {
            moving = false
            lastX = e.pageX - renderingElement.offsetLeft
            lastY = e.pageY - renderingElement.offsetTop
        })

        renderingElement.addEventListener('mousemove', e => {

            if (moving) {
                drawingContext.globalCompositeOperation = 'source-over'
                renderingContext.globalCompositeOperation = 'destination-out'

                let currentX = e.pageX - renderingElement.offsetLeft
                let currentY = e.pageY - renderingElement.offsetTop

                drawingContext.lineJoin = 'round'
                drawingContext.moveTo(lastX, lastY)
                drawingContext.lineTo(currentX, currentY)
                drawingContext.closePath()
                drawingContext.lineWidth = 120
                drawingContext.stroke()

                lastX = currentX
                lastY = currentY

                renderingContext.drawImage(drawingElement, 0, 0)
            }
        })

    }, [currentTheme])


    // # Set Motions
    const parent = {
        initial: { y: 800 },
        animate: {
            y: 0,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const child = {
        initial: { y: 800 },
        animate: {
            y: 0,
            transition: {
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    }

    return (
        <Banner>
            <Video>
                <video
                    src={require('../../assets/video/video.mp4')}
                    height='100%'
                    width='100%'
                    loop
                    autoPlay
                ></video>
            </Video>
            <Canvas
                ref={canvas}
                height={size.height}
                width={size.width}
                onMouseEnter={() => onCursor('hovered')}
                onMouseLeave={onCursor}
            />
            <BannerTitle
                variants={parent}
                initial='initial'
                animate='animate'
            >
                <Headline variants={child}>DIG</Headline>
                <Headline variants={child}>DEEP</Headline>
            </BannerTitle>
        </Banner>
    )
}

export default HomeBanner