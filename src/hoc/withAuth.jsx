import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

// Define the HOC function
const withAuth = Component => props => {
    // Get the user object from the UserContext
    const {user} =useUser()
    
    // Check if the user is authenticated
    if(user !== null){
      // If authenticated, render the original component with all of its props
      return <Component {...props} />
    }
    else {
      // If not authenticated, navigate to the home page
      return <Navigate to="/" />
    }
  }
  
  // Export the HOC
  export default withAuth