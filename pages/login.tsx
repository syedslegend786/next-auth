import React from 'react'
import { GetServerSideProps } from 'next'
import { getProviders, signIn, getSession } from 'next-auth/react'
const Login = ({ providers }: { providers: any }) => {
    console.log(providers)
    return (
        <div>
            {
                Object.values(providers).map((provider: any) => (
                    <button key={provider.id} onClick={() => {
                        signIn(provider.id, {
                            callbackUrl: "http://localhost:3000",
                            redirect: true,
                        })
                    }} className='border border-black p-[1.5rem]'>{provider.name}</button>
                ))
            }
        </div>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const providers = await getProviders()
    const sessions = await getSession(ctx)
    if (sessions) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            providers: providers
        }
    }
}