import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://todo-node-hii2.onrender.com/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
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

      <h3>Sign In</h3>
      
      <div>
        <label>Email address</label>

        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
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
          <button className="button" type="submit">Login</button>
      </div>
      <div style={{marginTop: "60px"}}>
          Create account using<Link to="/signup">Sign Up</Link>
      </div>
    </form>
  )
}

export default Login;