import React ,{useState} from 'react'

const Alert = ({type,msg}) => {
  const [toggle, setToggle] = useState(true)
  setTimeout(() => setToggle(false) ,1500)
  return toggle ? <div class={`alert alert--${type}`}>{msg}</div>
  :
  ''
}
export default React.memo(Alert);


