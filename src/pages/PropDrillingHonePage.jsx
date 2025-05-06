
import {createContext, useContext} from 'react';

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
      
      return (
        <MessageContext.Provider value={{message, edad}} >

          <div>  
          <ParentComponent />
          </div>

        </MessageContext.Provider>
      );
  }
  export default PropDrillingHomePage;
  
  