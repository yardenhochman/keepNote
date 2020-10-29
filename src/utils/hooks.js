import React from 'react'

export const useFocusElement = () => {
  const ref = React.useRef()
  React.useEffect(()=>{
    ref.current?.focus()
  },[])
  return ref
}