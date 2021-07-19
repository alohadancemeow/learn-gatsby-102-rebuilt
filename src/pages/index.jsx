import React from "react"
import HomeBanner from "../components/Home/HomeBanner"
import Layout from "../components/layout"

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext.js'

const IndexPage = props => {

  // # Get context
  const dispatch = useGlobalDispatchContext()
  const { currentTheme, cursorStyles } = useGlobalStateContext()

  // # Handle cursor
  const onCursor = (cursorType) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({
      type: 'CURSOR_TYPE',
      cursorType: cursorType
    })
  }


  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
    </Layout>
  )
}

export default IndexPage
