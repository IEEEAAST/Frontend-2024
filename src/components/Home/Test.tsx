import Logo from '../../assets/IEEELogoWhite.png'
import './styles/Test.css'
export const Test = () => {
  return (
    <div id="flex">
      <div id="circle" onClick={()=>{window.location.href='https://github.com/IEEE-AAST-Alexandria-Student-Branch/Frontend-2024';}}><img id="testimg" src={Logo}></img></div>
      This is our test page; To be replaced with the actual home page.<br></br>
      For now, enjoy this spinning IEEE thing.
    </div>
  )
}
