import {useContext, createContext, useState} from 'react';

// Navbar toggles the theme
const Navbar = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <nav style={{ padding: "1rem", background: theme === "dark" ? "#222" : "#eee" }}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
};

const Dashboard = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "2rem",
        background: theme === "dark" ? "#333" : "#fafafa",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h2>Dashboard</h2>
      <p>Current theme: {theme}</p>
    </div>
  );
};


const Layout = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

const ThemeContext = createContext();

const DashboardPage = () => { 

  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>

    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (

  <ThemeContext.Provider value={{theme, toggleTheme}} >  

    <div>
      <Layout />   
    </div>

  </ThemeContext.Provider>
  );
}
export default DashboardPage;

  