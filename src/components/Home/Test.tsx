import Logo from '../../assets/IEEELogoWhite.png'
import './styles/Test.css'
import { useState } from 'react';
export const Test = () => {
  const [url, setUrl] = useState('');
  return (
    <div id="flex">
      <a href="https://github.com/IEEE-AAST-Alexandria-Student-Branch/Frontend-2024" target="_blank">
      <div id="circle"><img id="testimg" src={Logo}></img></div>
      </a>
      This is our test page; To be replaced with the actual home page.<br></br>
      For now, enjoy this spinning IEEE thing.
      <input type='text' placeholder='Enter URL path here...' style={{width:"400px",height:"40px",borderRadius:"40px",padding:"15px",color:"black"}} onChange={event=>{setUrl(event.target.value);}}></input>
      <button className='defaultButton' onClick={()=>{window.open(`/${url}`,"_self")}}>Go</button>
    </div>
  )
}