import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Container, Flex } from '../styles/reusableStyle'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'


// # Nav routes data
const navRoutes = [
    {
        id: 0,
        title: "not humble",
        path: "/not-humble",
        video: "featured-video.mp4",
    },
    {
        id: 1,
        title: "bleeping easy",
        path: "/bleeping-easy",
        video: "easy.mp4",
    },
    {
        id: 2,
        title: "make it zero",
        path: "/make-it-zero",
        video: "make-it-zero.mp4",
    },
    {
        id: 3,
        title: "it takes an island",
        path: "/it-takes-an-island",
        video: "it-takes-an-island.mp4",
    },
    {
        id: 4,
        title: "50 beaches",
        path: "/50-beaches",
        video: "50-beaches.mp4",
    },
]

const Navigation = ({ onCursor, toggleMenu, setToggleMenu }) => {

    // # State
    const [revealVideo, setRevealVideo] = useState({
        show: false,
        video: 'featured-video.mp4',
        key: '0'
    })

    return (
        <>
            <AnimatePresence>
                {
                    toggleMenu && (
                        <Nav
                            initial={{ x: '-100%' }}
                            exit={{ x: '-100%' }}
                            animate={{ x: toggleMenu ? 0 : '-100%' }}
                            transition={{
                                duration: 0.8,
                                ease: [0.6, 0.05, -0.01, 0.9]
                            }}
                        >
                            <Container>
                                <NavHeader>
                                    <Flex spaceBetween noHeight>
                                        <h2>Projects</h2>
                                        <CloseNav
                                            onClick={() => setToggleMenu(!toggleMenu)}
                                            onMouseEnter={() => onCursor('pointer')}
                                            onMouseLeave={onCursor}
                                        >
                                            <button>
                                                <motion.span
                                                    animate={{
                                                        rotate: 45,
                                                        x: 1,
                                                        y: 5
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        ease: ["easeInOut"]
                                                    }}
                                                ></motion.span>
                                                <motion.span
                                                    animate={{
                                                        rotate: -45,
                                                        x: 1,
                                                        y: -10
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        ease: ['easeInOut']
                                                    }}
                                                ></motion.span>
                                            </button>
                                        </CloseNav>
                                    </Flex>
                                </NavHeader>

                                <NavList>
                                    <ul>
                                        {
                                            navRoutes.map(item => (
                                                <motion.li
                                                    key={item.id}
                                                    onHoverStart={() => setRevealVideo({
                                                        ...revealVideo,
                                                        show: true,
                                                        video: item.video,
                                                        key: item.id
                                                    })}
                                                    onHoverEnd={() => setRevealVideo({
                                                        ...revealVideo,
                                                        show: false,
                                                        video: item.video,
                                                        key: item.id
                                                    })}
                                                    onMouseEnter={() => onCursor('pointer')}
                                                    onMouseLeave={onCursor}
                                                >
                                                    <Link to={`/projects/${item.path}`}>
                                                        <motion.div
                                                            className="link"
                                                            initial={{ x: -108 }}
                                                            whileHover={{
                                                                x: -40,
                                                                transition: {
                                                                    duration: 0.4,
                                                                    ease: [0.6, 0.05, -0.01, 0.9]
                                                                }
                                                            }}
                                                        >
                                                            <span className="arrow">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 101 57"
                                                                >
                                                                    <path
                                                                        d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                                                        fill="#FFF"
                                                                        fillRule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            {item.title}
                                                        </motion.div>
                                                    </Link>
                                                </motion.li>
                                            ))
                                        }
                                    </ul>
                                </NavList>

                                <NavFooter>

                                </NavFooter>

                                <NavVideos>
                                    <motion.div
                                        className="reveal"
                                        animate={{
                                            width: revealVideo.show ? 0 : '100%'
                                        }}
                                    >

                                    </motion.div>
                                    <div className="video">
                                        <AnimatePresence
                                            initial={false}
                                            exitBeforeEnter
                                        >
                                            <motion.video
                                                key={revealVideo.key}
                                                initial={{ opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: 'easeInOut'
                                                }}
                                                src={require(`../assets/video/${revealVideo.video}`)}
                                                loop
                                                autoPlay
                                            />
                                        </AnimatePresence>
                                    </div>
                                </NavVideos>
                            </Container>
                        </Nav>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Navigation


// # Styled-components
const Nav = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: ${props => props.theme.red};
    color: #000;
    z-index: 100;
    overflow: hidden;
`

const NavHeader = styled.div`
    top: 72px;
    position: relative;

    h2 {
        color: ${props => props.theme.background};
    }
`

const CloseNav = styled.div`
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
            background: ${props => props.theme.background};
            margin: 8px;
        }
    }
`

const NavList = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    ul {
        padding: 0;

        li {
            list-style: none;
            font-size: 3rem;
            text-transform: uppercase;
            font-weight: 900;
            height: 96px;
            line-height: 96px;
            overflow: hidden;

            .link {
                color: ${props => props.theme.background};
                position: relative;
                display: flex;
                align-items: center;

                .arrow {
                    height: 76px;
                    margin-right: 8px;

                    svg {
                        width: 100px;
                        path {
                            fill: ${props => props.theme.background};
                        }
                    }
                }
            }
        }
    }
`

const NavFooter = styled.div``


const NavVideos = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 28%;
    z-index: -1;
    height: 100%;
    width: 100%;
    background: #000;

    .reveal {
        width: 100%;
        background: ${props => props.theme.red};
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }

    .video {
        background: #000;
        position: absolute;
        height: 100%;
        margin: 0;
        z-index: -1;

        video {
            height: 100%;
        }
    }
`

