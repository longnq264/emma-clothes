import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';


// Tạo Context
const DarkModeContext = createContext();

// Tạo Provider
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Xác định kiểu dữ liệu cho props
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook tùy chỉnh để sử dụng DarkMode
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
