import {useState} from 'react';

const usePasswordValidation = (initialPassword = "") => {

    const [password, setPassword] = useState(initialPassword);
    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {

        const existingPassword = e.target.value;
        setPassword(existingPassword);

        if (!validatePassword(existingPassword)) {
            setError("La contraseña no es válida");
        }
        else {
            setError("");
        }
    }
    const validatePassword = (newPassword) => {
        if (newPassword.length > 4) {
            return true;
        }
        else {
            return false;
        }
    }

    
    
    return {
      password, 
      handlePasswordChange, 
      error
    }

}

export default usePasswordValidation;