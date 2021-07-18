import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// Components
import { Container, Flex } from '../styles/reusableStyle'

// Context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext.js'

const Header = ({ onCursor }) => {

    // # Using context
    const dispatch = useGlobalDispatchContext()
    const { currentTheme } = useGlobalStateContext()

    // # Handle toggle
    const toggleTheme = () => {
        currentTheme === 'dark'
            ? dispatch({ type: 'TOGGLE_THEME', theme: 'light' })
            : dispatch({ type: 'TOGGLE_THEME', theme: 'dark' })
    }

    // # Set current theme to localStorage
    useEffect(() => {
        window.localStorage.setItem('theme', currentTheme)
    }, [currentTheme])


    return (
        <HeaderNav
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -72, opacity: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
            <Container>
                <Flex spaceBetween noHeight>
                    <Logo
                        onMouseEnter={() => onCursor('hovered')}
                        onMouseLeave={onCursor}
                    >
                        <Link to='/'>FURR</Link>
                        <span
                            onClick={toggleTheme}
                            onMouseEnter={() => onCursor('pointer')}
                            // onMouseLeave={onCursor}
                            onMouseLeave={() => onCursor('hovered')}
                        ></span>
                        <Link to='/'>W</Link>
                    </Logo>
                    <Menu>
                        <button>
                            <span></span>
                            <span></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    )
}

export default Header


// # Styled-components
const HeaderNav = styled(motion.div)`
    height: 0px;
    width: 100%;
    position: absolute;
    top: 72px;
    right: 0;
    left: 0;
    z-index: 99;
`
const Logo = styled.div`
    a {
        font-size: 1.8rem;
        font-weight: 800;
        color: ${props => props.theme.text};
    }

    span {
        height: 1rem;
        width: 1rem;
        background: ${props => props.theme.red};
        margin: 0 4px;
        border-radius: 100%;
        display: inline-block;
        position: relative;
        bottom: 2px;
    }
`
const Menu = styled.div`
   button {
        transform-origin: center;
        border: none;
        padding: 20px;
        background: none;
        outline: none;

        span {
            width: 36px;
            height: 8px;
            display: block;
            background: ${props => props.theme.text};
            margin: 8px;
        }
   }
`

