import React ,{useState,useEffect,useContext,createContext} from 'react'

const AuthContext=createContext();



const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:''
    })
    //axios.default.headers.commom["Authorization"]=auth?.token //common headers sab ma bhajna ka liya
    useEffect(() => {
        const parse=localStorage.getItem('auth');
       
        if (parse) {
            const parsedata=JSON.parse(parse);
            setAuth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
            })
        }
        //eslint-disable-next-line
    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook

const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider};