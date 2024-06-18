import React from 'react'
import UserContext from '../../UserContext'

const PermissionGate = ({children}) => {
  const {data} = React.useContext(UserContext)
  if (data && data.permission === 1) return (
    children
  )
  return null
}

export default PermissionGate