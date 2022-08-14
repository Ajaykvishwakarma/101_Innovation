import { Route, Routes } from 'react-router-dom' ;
import { Details } from '../Components/Details/Details';
import { Favorite } from '../Components/Favorite/Favorite';
import { Food } from '../Components/Food/Food';
import { Navbar } from '../Components/Navbar/Navbar';

import { NotFound } from '../Components/Notfound/NotFound';

export const AllRoutes = ()=>{

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Food/> } />
                <Route path="/favorite" element={<Favorite /> } />
                <Route path="/food/:id" element={<Details />} />
               <Route path='*' element={<NotFound />} />
            </Routes>

        </>
    )
}