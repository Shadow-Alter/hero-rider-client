import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/login.svg'
import { useAuth } from '../../context/AuthContext';
import { bdNumberRegex, emailRegex, passRegex } from '../../pages/Register/Regex'

const RegisterLearner = () => {
    const [inputError, setInputError] = useState({});
    const [vehicleType, setVehicleType] = useState("Choose One");
    const [regInfo, setRegInfo] = useState({});
    const { signUp } = useAuth();
    let navigate = useNavigate();
    // console.log(regInfo);

    const handleInputValidation = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const info = { ...regInfo };

        if (inputName === 'email') {
            if (!emailRegex.test(inputValue)) {
                setInputError({ name: inputName, errorMessage: 'Please Type a Valid Email !' })
                info[inputName] = null;
                setRegInfo(info)
            } else {
                setInputError(null);
                info[inputName] = inputValue;
                setRegInfo(info)
            };
        };
        if (inputName === 'password') {
            if (!passRegex.test(inputValue)) {
                setInputError({ name: inputName, errorMessage: 'Must be more than 8 chars combine with uppercase and lowercase, and at least one number' })
                info[inputName] = null;
                setRegInfo(info)
            }
            else {
                setInputError(null)
                info[inputName] = inputValue;
                setRegInfo(info)
            }
        };
        if (inputName === 'number') {
            if (!bdNumberRegex.test(inputValue)) {
                setInputError({ name: inputName, errorMessage: 'Number must be 11 digit and start with 01' })
                info[inputName] = null;
                setRegInfo(info)
            }
            else {
                setInputError(null)
                info[inputName] = inputValue;
                setRegInfo(info)
            }
        };

        info[inputName] = inputValue;
        setRegInfo(info)
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if(regInfo.email && (regInfo.password === regInfo.conPassword)){
            try {
                await signUp(regInfo.email, regInfo.password);
                addLearnerToDB()
                navigate("/login");
              } catch (err) {
                // setError(err.message);
              }
        }
       

    }

    const addLearnerToDB = () =>{
         const  user =  { email: regInfo.email, name: regInfo.fullname, address: regInfo.address, age: regInfo.age, profilePic:regInfo.profilePic, NIDPic: regInfo.NIDPic, number: regInfo.number , role:"Learner", vehicleType:vehicleType}
        // console.log(user);

        axios.post('http://localhost:5000/addUser', user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    

    return (
        <section style={{ marginTop: "130px" }}>
            {/* <Header /> */}
            <div className="container py-5" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-7 shadow-sm rounded-3 border p-4 d-flex flex-column justify-center align-items-center">
                        <h3 className='text-brand'>Create Your Account</h3>
                        <div className="p-2 w-75">
                            <label htmlFor="email">Email Id</label>
                            <input type="text" onChange={handleInputValidation} className="custom-input d-block w-100 px-3 py-2 rounded" name='email' id='email' placeholder='Name@Company_Name.com' />
                            {
                                inputError?.name === 'email' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                            }
                        </div>

                        <div className="p-2 w-75">
                            <div className="row">
                                <div className="col-9">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input type="text" onChange={handleInputValidation} className='custom-input d-block w-100 px-3 py-2 rounded' name='fullname' id='fullname' placeholder='Ashab Hussan' />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" onChange={handleInputValidation} className='custom-input d-block w-100 px-3 py-2 rounded' name='age' id='age' placeholder='23' />
                                </div>
                            </div>
                        </div>
                        <div className="p-2 w-75">
                            <div className="row">
                                <div className="col-9">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" onChange={handleInputValidation} className='custom-input d-block w-100 px-3 py-2 rounded' name='address' id='address' placeholder='60/1 Modina Market, Sylhet' />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="vehicleType">VehicleType</label>
                                   
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {vehicleType}
                                        </button>
                                        <ul class="dropdown-menu "  aria-labelledby="dropdownMenuButton1">
                                            <li  class="dropdown-item" onClick={()=>setVehicleType('Car')} >Car</li>
                                            <li  class="dropdown-item"  onClick={()=>setVehicleType('Bike')} >Bike</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 w-75">
                            <label htmlFor="mobile">Mobile Number</label>
                            <div className="row">
                                <div className="col-3">
                                    <input type="text" className='custom-input d-block w-100 px-3 py-2 rounded' value='+88' name='country_code' />
                                </div>
                                <div className="col-9">
                                    <input onChange={handleInputValidation} className='custom-input d-block w-100 px-3 py-2 rounded' type="number" name="number" id="mobile" placeholder='11 Digit Mobile Number' />
                                    {
                                        inputError?.name === 'number' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="p-2 w-75">
                            <label htmlFor="profilePic">Profile Pic</label>
                            <div class="input-group">
                                <input type="file" onChange={handleInputValidation} name='profilePic' class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
                            </div>
                        </div>

                        <div className="p-2 w-75">
                            <label htmlFor="NIDPic">NID Pic</label>
                            <div class="input-group">
                                <input type="file"  onChange={handleInputValidation} name='NIDPic' class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
                            </div>
                        </div>

                        <div className="p-2 w-75">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={handleInputValidation} className="custom-input d-block w-100 px-3 py-2 rounded" name='password' id='password' placeholder="Enter Your Secret Code" />
                            {
                                inputError?.name === 'password' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                            }
                        </div>



                        <div className="p-2 w-75">
                            <label htmlFor="conPassword">Confirm Password</label>
                            <input type="password" onChange={handleInputValidation} className="custom-input d-block w-100 px-3 py-2 rounded" name='conPassword' id='conPassword' placeholder="Enter Your Secret Code again" />
                            {
                                inputError?.name === 'conPassword' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                            }
                        </div>

                        <p className="p-2">By registering, you agree to our <Link to="/" className='text-decoration-none'>Terms & Conditions.</Link></p>
                        <button onClick={addLearnerToDB} className="btn-brand-outline w-50">Register Now</button>
                        <div className="w-75 text-center py-3">
                            <p>
                                Have an Account ? Please <Link to="/login">
                                    <button className='btn border'>
                                        Login
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center py-5">
                        <img className='img-fluid' src={login} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterLearner;