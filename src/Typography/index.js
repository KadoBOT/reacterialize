import React from 'react'

const Typography = el => ({adjustMargin, children, type = 'body1'}) => {
  const T = el

  const mdcPre = 'mdc-typography--'
  const mdcClass = `${mdcPre}${type}`
  const mdcAdjustMargin = `${mdcPre}adjust-margin`
  const getClassName = adjustMargin ?
    `${mdcClass} ${mdcAdjustMargin}` :
    mdcClass

  return <T className={getClassName}>{children}</T>

}


export default Typography
