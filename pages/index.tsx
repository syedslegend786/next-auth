import React from 'react'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from 'utils/requireAuthentication'
import {signOut} from 'next-auth/react'
const Home = (props:any) => {
  console.log(props.sessions)
  return (
    <div>
      {props.sessions.name}
      <button className='border border-black p-[1.5rem]' onClick={()=>{
        signOut()
      }}>Log out</button>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return requireAuthentication(ctx, (sessions: any) => {
    return {
      props: {
        sessions:sessions
      }
    }
  })
}