import {  createContext, useState  } from "react";


 export const PageContext = createContext() // Create Box

 export const PageContextProvider = ({ children }) => {

    const [page, setPage] = useState(0);
    

    const handleChange = (value) => {
        setPage(value)
    }

    return <PageContext.Provider value ={{page, handleChange}}>
        {children}
        </PageContext.Provider>
}