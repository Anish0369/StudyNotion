// This route will prevent authenticate users to access the login and signup button and navigate them to Dashboard page 

// What does the useSelector hook do?
// The useSelector hooks allow you to extract data or the state from the Redux store using a selector function. 

// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute