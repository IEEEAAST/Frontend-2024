export const MailDesign = () => {
  return (
    /* <div className="flex flex-col flex-1 justify-center items-start h-screen max-w-[625px] text-wrap px-8 "> */
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-[600px] ">
        <h1 className="text-4xl sm:text-6xl">Hey,</h1>
        <p className="pt-4 text-left   ">
          You’ve entered this email as your IEEE AAST account email address.{" "}
          <br />
          Now it’s time to make sure it’s really you.
          <br /> Just click the link below ;)
        </p>

        <button className="defaultButton mt-12">Yes, It’s Me</button>
        <p className="my-8">
          If you don’t know what this email is, you may have received it by
          mistake. Simply, ignore it.
        </p>
        <footer className="flex justify-between">
          <p className="footer_text">® IEEE AAST ALEX SB</p>

          <a href="https:www.linkedin.com/company/ieeeaast/">
            <img src="\src\assets\linkedin-white.png" id="linkedin" />
          </a>
          <img src="\src\assets\twitter-white.png" id="twitter" />
        </footer>
      </div>
    </div>
  );
};

// // export default Header;
// //import { useState, useEffect } from 'react'
// import './App.css'

// function App() {
//   const [name, setName] = useState('')

//   useEffect(() => {
//     const storedName = localStorage.getItem('name')
//     if (storedName) {
//       setName(storedName)
//     }
//   }, [])

//   return(
//     <div>
//       <div className='center_box'>
//         <div className='inside_text'>
//           <h className='greeting_text'>Hello, {name}</h>
//           <br/>
//           <br/>
//           <p className='identification_text'>You've entered this emailas your IEEE AAST account email address.<br/>
//           Now it's time to make sure it's really you.<br/>
//           Just click the link below</p>
//           <br/>
//           <button className='btn'>
//             Yes, It's Me
//           </button>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <p className='message_text'>If you don't know what this email is, you may have recieved it by mistake.<br/>
//           Simply, ignore it.<br/></p>
//           <hr/>
//           <footer className='footer'>
//             <p className='footer_text'>® IEEE AAST ALEX SB</p>
//             <div>
//               <a href='https://www.linkedin.com/company/ieeeaast/'>
//                 <img src="\images\linkedin-white.png" id='linkedin'/>
//               </a>
//                 <img src='\images\twitter-white.png' id='twitter' />
//             </div>
//           </footer>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default App
//CSS

// * {
// background-color: #000b21;
// }

// body {
// height: 100%;
// }

// body {
// display: flex;
// justify-content: center;
// align-items: center;
// background-color: #000b21;
// }

// .center_box {
// width: 1100px;
// height: 500px;
// }

// .greeting_text {
// font-size: 45px;
// color: white;
// font-weight: 700;
// }

// .identification_text {
// color: white;
// }

// .btn {
// border-radius: 25px;
// width: 200px;
// background-color: #000b21;
// color: white;
// border-color: white;
// border: 2px solid;
// }

// .btn:hover {
// background-color: white;
// color: black;
// transition: 0.5s;
// }

// .message_text {
// color: gray;
// }

// .footer {
// display: flex;
// justify-content: space-between;
// }

// .footer_text {
// color: white;
// }

// #linkedin {
// justify-self: flex-end;
// margin-right: 30px;
// margin-top: 20px;
// width: 20px;
// }

// #linkedin:hover {
// box-shadow: 0 0 50px 1px #ffffff;
// transition: 0.1s ease-in-out;
// position: relative;
// bottom: 3px;
// }

// #twitter {
// width: 20px;
// background-color: transparent;
// }

// #twitter:hover {
// box-shadow: 0 0 50px 1px #ffffff;
// transition: 0.1s ease-in-out;
// position: relative;
// bottom: 3px;
// }
