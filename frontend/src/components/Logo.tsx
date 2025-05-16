import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to='/'
    >
      <img src="/petlogo.png" alt="Pets Logo" />
    
    </Link>
  )
}
