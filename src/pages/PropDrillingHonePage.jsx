
import {createContext, useContext} from 'react';
import PasswordForm from '../components/PasswordForm';
import Emoji from '../components/emoji';

const MessageContext = createContext();

const ChildChildComponent = () => {
    const {message, edad}  = useContext(MessageContext);
    return (
        <div>
        <h1> Soy un hijo Child Child componente </h1>
        <div>Child Child : {message} y edad {edad}</div>
        </div>
    )
}

const ChildComponent = () => {
    const {message} = useContext(MessageContext);
    return (
      <div>
        <h1> Soy un hijo Child componente </h1>
        <div>Child : {message} </div>
        <ChildChildComponent />
      </div>
    )
  };
  
  const ParentComponent = () => {
    const {message} = useContext(MessageContext);

    return (
      <div>
        <h1> Soy el padre componente </h1>
        <h2>{message}</h2>
        <ChildComponent />
      </div>
    );
  }
  
  function PropDrillingHomePage() {
    
      const message = "Hello everyone!";
      const edad = 50;

   
      // console.log(response)
      
      return (
        <MessageContext.Provider value={{message, edad}} >

          <div>  
          =================  DRILLNG ========================================
          <ParentComponent /> <p/>
          ===================  HOOK  =========================================
          <PasswordForm /> <p/>
          =========   PYTHON/FLASK EN DOCKER // UTILIZADO EN REACT  ==========
          <Emoji/>



          </div>

        </MessageContext.Provider>
      );
  }
  export default PropDrillingHomePage;
  
  