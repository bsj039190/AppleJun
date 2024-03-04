import React, { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const UserContext = createContext();

// Context의 Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 브라우저 새로고침 시 로컬 스토리지에서 데이터 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 컴포넌트가 언마운트되기 전에 로컬 스토리지에 데이터 저장
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    return () => {
      // 컴포넌트가 언마운트될 때 정리 작업 수행
    };
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
