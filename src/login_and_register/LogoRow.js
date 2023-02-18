import './LogoRow.css';
import { Link } from 'react-router-dom';
import LanguangeButton from '../LanguangeButton';

function LogoRow({ nowOnline,toRunFunc }) {

    return (
        <div className='row'>
            <div className='col-xl-3 d-flex justify-content-center justify-content-md-start'>
                <LanguangeButton toRunFunc={toRunFunc}/>
            </div>
            <div className='col-xl-6 d-flex justify-content-center' id="logo">
                <Link to="/"><img src={require("../tp2.png")} id="imgLogo"></img></Link>
            </div>
            <div className='col-xl-3 d-none d-m-block'></div>
        </div>
    )
}

export default LogoRow;