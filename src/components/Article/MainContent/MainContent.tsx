import {useState} from "react";
import "./styles/MainContent.css";
import {Modal} from "../Modal/Modal";

export const MainContent = () => {

  const [modal, setModal] = useState(false);

    return <div className="main-content">
            <span><b>Onboarding - Making minimal fun ;)</b></span>
            <button className="report" onClick={()=>setModal(true)}>Report</button>
            {modal && <Modal closeModal={setModal}/>}
          </div>;
};
