import React ,{useState,useEffect,useContext,createContext} from 'react'

const SearchContext=createContext();



const SearchProvider=({children})=>{
    const [auth,setAuth]=useState({
        keyword:'null',
        products:[]
    })
  
    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

//custom hook

const useSearch=()=>useContext(SearchContext)

export {useSearch,SearchProvider};