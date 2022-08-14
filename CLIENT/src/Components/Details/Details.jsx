import { useEffect } from "react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { perticularData } from "../../Redux/action"
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import './Details.css';
export const Details = () => {
    const navigate = useNavigate()
 
    const { id } = useParams()
    const dispatch = useDispatch()

    const baseUrl = `https://innovationer.herokuapp.com`
    const { PertiData, loading } = useSelector((store) => store)
    useEffect(()=>{
        let url = `${baseUrl}/food/${id}`
        dispatch(perticularData(url))
    },[])

console.log(PertiData)
    return loading ? (
        <>
       
        <div className="spinner_div">
        <Box>
            <CircularProgress />
        </Box>
        </div>
        </>
        ) : (
            <>
            
        <div className="detail_container">
            <h3 className="heading">Full Details</h3>
            {[PertiData].map((el) => (

            
            <div className="detail_div" key={el._id}>
                <table border={{}}>
                <tbody>
                    {Object.keys(fooditem).map((key, index) => {
                    return (
                        <tr key={index}>
                        <td style={{ fontWeight: "bold" }}>{key}</td>
                        <td>{fooditem[key]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                
            </div>
            ))}
            <div>
            <Link to="/" style={{textDecoration:"none"}}> <Button variant="outlined" style={{marginTop:"30px"}}>Back to Home</Button></Link>
            <Button variant="outlined" style={{marginTop:"30px"}}>ADD to favorite</Button>
            </div>
        </div>
        </>
    )
}