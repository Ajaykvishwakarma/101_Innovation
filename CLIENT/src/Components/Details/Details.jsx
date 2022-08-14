import { useEffect } from "react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { perticularData } from "../../Redux/action"
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
export const Details = () => {
    const navigate = useNavigate()
 
    const { id } = useParams()
    // console.log(id)
    const dispatch = useDispatch()

    const baseUrl = `https://innovationer.herokuapp.com`
    const { PertiData, loading } = useSelector((store) => store)
    useEffect(()=>{
        let url = `${baseUrl}/food/${id}`
        dispatch(perticularData(url))
    },[])




    const addHandle = ()  =>  {
        
           axios.post(`${baseUrl}/favorite`,{
            _id : PertiData._id,
            code: PertiData.code,
            url: PertiData.url,
            icon : PertiData.icon,
            creator: PertiData.creator,
            product_name: PertiData.product_name,
            generic_name: PertiData.generic_name,
            quantity: PertiData.quantity,
            packaging:PertiData.packaging,
            packaging_tags: PertiData.packaging_tags,
            serving_size: PertiData.serving_size,
            energy_100g: PertiData.energy_100g,
            energy_from_fat_100g:PertiData.energy_from_fat_100g,
            fat_100g: PertiData.fat_100g,
            saturated_fat_100g: PertiData.saturated_fat_100g,
            monounsaturated_fat_100g: PertiData.monounsaturated_fat_100g,
            polyunsaturated_fat_100g: PertiData.polyunsaturated_fat_100g,
            omega_3_fat_100g: PertiData.omega_3_fat_100g,
            omega_6_fat_100g: PertiData.omega_6_fat_100g,
            trans_fat_100g: PertiData.trans_fat_100g,
            cholesterol_100g: PertiData.cholesterol_100g,
            carbohydrates_100g: PertiData.carbohydrates_100g,
            sugars_100g: PertiData.sugars_100g,
            fiber_100g: PertiData.fiber_100g,
            proteins_100g: PertiData.proteins_100g,
            salt_100g: PertiData.salt_100g,
            sodium_100g: PertiData.sodium_100g
          }).then((res) => {  
            alert("Added Successfully")
          }).catch(err => {
          alert("Please Select another Item to add into favorite, Beacause its already Added!")
          })
        }


console.log(PertiData?._id)
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
        <div className="items">
                <div className="food-items-img-cont">
                    <img className="food-items-img" src={PertiData?.icon} alt="Image" />
                </div>
                <div className="food-items-text-cont">  <h4>{PertiData?.product_name}. ( {PertiData?.generic_name}  )</h4>
                    <hr></hr>
                </div>
                        
            </div>
           
            <div className="detail_div">
          
            <table id="table-cont">
                <tbody>
                    {Object.keys(PertiData).map((key, index) => {
                    return (
                        <tr key={index}>
                        <td style={{ fontWeight: "700" }}>{key}</td>
                        <td>{PertiData[key] === null ? "Null" : PertiData[key]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            <div>
            <Link to="/" style={{textDecoration:"none"}}> <Button variant="outlined" style={{marginTop:"30px"}}>Back to Home</Button></Link>
            <Button variant="outlined" style={{marginTop:"30px"}} onClick={addHandle}>ADD to favorite</Button>
            </div>
        </div>
        </>
    )
}