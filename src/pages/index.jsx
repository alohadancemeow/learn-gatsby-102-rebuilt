import React, { useState } from "react"
import HomeAbout from "../components/Home/HomeAbout"
import HomeBanner from "../components/Home/HomeBanner"
import HomeContent from "../components/Home/HomeContent"
import HomeFeatured from "../components/Home/HomeFeatured"
import Layout from "../components/layout"

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext.js'

const IndexPage = props => {

  // # Toggle state
  const [toggleMenu, setToggleMenu] = useState(false)

  // # Get context
  const dispatch = useGlobalDispatchContext()
  const { cursorStyles } = useGlobalStateContext()

  // # Handle cursor
  const onCursor = (cursorType) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({
      type: 'CURSOR_TYPE',
      cursorType: cursorType
    })
  }


  return (
    <Layout
      toggleMenu={toggleMenu}
      setToggleMenu={setToggleMenu}
    >
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
      <HomeFeatured
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <HomeAbout onCursor={onCursor} />
    </Layout>
  )
}

export default IndexPage
