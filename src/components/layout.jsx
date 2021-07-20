import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// Components
import Header from './Header'
import CustomCursor from './CustomCursor'

// Context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext.js'

// Create global style
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { normalize } from 'styled-normalize'
import Navigation from "./Navigation"

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
    cursor: none;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smooting: antialiased;
    font-size: 16px;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`


// # Layout
const Layout = ({ children, toggleMenu, setToggleMenu }) => {

  // # Grapql query
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // # Get context
  const dispatch = useGlobalDispatchContext()
  const { currentTheme, cursorStyles } = useGlobalStateContext()


  // # Themes
  const darkTheme = {
    background: '#000',
    text: '#fff',
    red: '#ea291e'
  }

  const lightTheme = {
    background: '#fff',
    text: '#000',
    red: '#ea291e'
  }


  // # Handle cursor
  const onCursor = (cursorType) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({
      type: 'CURSOR_TYPE',
      cursorType: cursorType
    })
  }


  return (
    <ThemeProvider theme={
      currentTheme === 'dark'
        ? darkTheme
        : lightTheme
    }>
      <GlobalStyle />

      <CustomCursor
        toggleMenu={toggleMenu}
      />
      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <Navigation
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <main>{children}</main>

    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
