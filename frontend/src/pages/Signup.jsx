import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState("");

  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://todo-node-hii2.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, userName})
    });

    const json = await response.json();

    if (!response.ok) {
        console.log(json.error);
        setError(json.error);
    }

    if (response.ok) {
        console.log(json);
        dispatch({type: "LOGIN", payload: json});

        localStorage.setItem("user", JSON.stringify(json));
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>

      <h3>Sign Up</h3>
      
      <div>
        <label>Email address</label>

        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
        />
      </div>

      <div>
        <label>Username</label>

        <input 
            type="text" 
            onChange={(e) => setUserName(e.target.value)} 
            value={userName} 
        />
      </div>
      
      <div>
        <label>Password</label>
        
        <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
        />
      </div>

      {error && <div>{error}</div>}
      <div>
        <button className="button" type="submit">Sign up</button>
      </div>
      <div style={{marginTop: "60px"}}>
          Already have a acount, Please <Link to="/login">Log in</Link>
      </div>
    </form>
  )
}

export default Signup