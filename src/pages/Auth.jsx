import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UrlState } from '@/context'



function Auth() {

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div>
        <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login/>
        </TabsContent>
        <TabsContent value="signup">
          <Signup/>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}

export default Auth