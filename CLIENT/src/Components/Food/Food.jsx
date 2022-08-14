import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import {useContext} from "react";
import { PageContext } from "../../context/PageContext";
import './Food.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../Redux/action';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
export const Food = () => {

    const {handleChange} = useContext(PageContext);

    const navigate = useNavigate()
    const [currPage, setCurrPage] = useState(1)

    const dispatch = useDispatch()
 

    const { dataObj, loading } = useSelector((store) => store)
    const baseUrl = 'https://innovationer.herokuapp.com';


    useEffect(() => {
        handleChange(1);
        let url = `${baseUrl}/foods`
        dispatch(fetchData(url))
    },[]);

    const handleDelete = (id) => {
        let url = `${baseUrl}/food/${id}`
        dispatch(deleteData(url))
    }
   
    async function pageChange(page) {
        setCurrPage(page)
        let url = `${baseUrl}/foods?page=${page}`
        dispatch(fetchData(url))
    }


    const [sort, setSort] = React.useState('');
  
    const handleChange2 = (event) => {
      setSort(event.target.value);
    };
    useEffect(() =>{
        sortBtn(sort)
    },[sort])

    async function sortBtn(sort) {
        let url = `${baseUrl}/foods?q=sort&sort=${sort}`
        dispatch(fetchData(url))
    }
    

    const [ filter, setFilter ] = React.useState('')
    const handleChange1 = (event) => {
        setFilter(event.target.value)
    }
    useEffect(() =>{
        filterBtn(filter)
     
        
    },[filter])
    async function filterBtn(filter) {
 
        if(filter.length === 0) {
            let url = `${baseUrl}/foods`
            dispatch(fetchData(url))
        }
        else{
            let url = `${baseUrl}/foods?q=filter&base=${filter}`
            dispatch(fetchData(url))
        }
   

    }

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
            
    <div className="food-cont">
    <div className="sort">
                        <div>
                        <FormControl sx={{  minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Filter</InputLabel>
                            <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={filter}
                            label="Filter"
                            onChange={handleChange1}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"spl"}>Spl</MenuItem>
                            <MenuItem value={"openfoodfacts-contributors"}>Openfoodfacts-contributors</MenuItem>
                            <MenuItem value={"stephane"}>Stephane</MenuItem>
                            <MenuItem value={"javichu"}>Javichu</MenuItem>
                            <MenuItem value={"sylphe"}>Sylphe</MenuItem>
                            <MenuItem value={"lalorelei"}>Lalorelei</MenuItem>
                            <MenuItem value={"nash"}>Nash</MenuItem>
                            <MenuItem value={"hummingbrid"}>Hummingbrid</MenuItem>
                            <MenuItem value={"jitrixis"}>Jitrixis</MenuItem>
                            <MenuItem value={"miles67off"}>miles67off</MenuItem>
                            
                            </Select>
                        </FormControl>
                        </div>
                        <div>
                        <FormControl sx={{  minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Sort</InputLabel>
                            <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sort}
                            label="Sort"
                            onChange={handleChange2}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Energy 100g, Low to high</MenuItem>
                            <MenuItem value={-1}>Energy 100g, High to low</MenuItem>
                            
                            </Select>
                        </FormControl>
                        </div>

                    </div>
        <div className="food-items">
            {dataObj.food?.map((el) => (
                <div className="items" key={el._id}>
                <div className="food-items-img-cont">
                    <img className="food-items-img" src={el.icon} alt="Image" />
                </div>
                <div className="food-items-text-cont"><Link to={`/food/${el._id}`} style={{color:"black"}}>  <h4>{el.product_name}. ( {el.generic_name}  )</h4> </Link>
                    <hr></hr>
                </div>
                        
                <div >
                <Button variant="text" style={{marginTop:"50px"}}  onClick={() => handleDelete(el._id)}>
                            <DeleteIcon />
                </Button>
                </div>
            
            </div>
            ))}
            
            
           
        </div>
        
        <div className="pagination">
            <Pagination defaultPage={currPage} count={dataObj.totalPages?.length} onChange={(e, value) => {pageChange(value)}} />
        </div>

    </div>
    </>

)
}