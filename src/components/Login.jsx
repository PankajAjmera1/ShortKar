import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import { useState } from 'react'
import * as Yup from 'yup'
import { login } from '../db/apiAth'
import useFetch from '../hooks/use-fetch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'





function Login() {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ 
            ...prevState, 
            [name]: value,}));
        };


        //navigate
        const navigate = useNavigate();

        let [searchParams] = useSearchParams();
        const longLink = searchParams.get("createNew");


        //useFetch
        const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
        const {fetchUser} = UrlState();

        useEffect(() => {
            if (error === null && data) {
                console.log(data);
              fetchUser();
              navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [error, data]);

        
    // handle login
    const handleLogin = async () => {
        setErrors([]);
        try {
          const schema = Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          });
    
          await schema.validate(formData, {abortEarly: false});
          await fnLogin();
        } catch (e) {
          const newErrors = {};
    
          e?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
          });
    
          setErrors(newErrors);
        }
      };


  return (
    <div>
         <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button  onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Login