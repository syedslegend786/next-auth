import React from 'react'
import { GetServerSideProps } from 'next'
import { getProviders, signIn, getSession } from 'next-auth/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const Login = ({ providers }: { providers: any }) => {
    console.log(providers)
    const signInValidation = Yup.object().shape({
        email: Yup.string().required("email is required").email(),
        password: Yup.string().required("password is required!")
    })
    return (
        <div>
            <Formik
                onSubmit={async (values) => {
                    const base = `http://localhost:3000`
                    try {
                        const res = await signIn('credentials', {
                            redirect: true,
                            callbackUrl: base,
                            ...values,
                        })
                        if (res?.error) {
                            alert(res.error)
                        }
                    } catch (error: any) {
                        console.log(error)

                        alert(error?.message)
                    }
                }}
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={signInValidation}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <Field name='email' placeholder='email' type='email' />
                            {
                                errors.email && touched.email ? (
                                    <span className='text-red-500'>{errors.email}</span>
                                ) : null
                            }
                        </div>
                        <div>
                            <Field name='password' placeholder='password' type='text' />
                            {
                                errors.password && touched.password ? (
                                    <span className='text-red-500'>{errors.password}</span>
                                ) : null
                            }
                        </div>
                        <div>
                            <button type='submit'>submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
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