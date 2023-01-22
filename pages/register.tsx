import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Atleast 6 digit password is required!").required("Password is required!")
});

const ValidationSchemaExample = () => (
    <div>
        <h1 className='text-center'>Signup</h1>
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
                const base = `http://localhost:3000`
                try {
                    const res = await axios.post(`${base}/api/auth/signup`, {
                        ...values,
                    })
                    alert(res.data.msg)
                } catch (error: any) {
                    alert(error.response.data.msg)
                }
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field name='name' placeholder='name' className='border border-black rounded-md p-[1.5rem]' />
                        {errors.name && touched.name ? (
                            <div className='text-red-500'>{errors.name}</div>
                        ) : null}
                    </div>
                    <div>
                        <Field placeholder='email' className='border border-black rounded-md p-[1.5rem]' name="email" type="email" />
                        {errors.email && touched.email ? <div className='text-red-500'>{errors.email}</div> : null}
                    </div>
                    <div>
                        <Field placeholder='password' className='border border-black rounded-md p-[1.5rem]' name="password" type="text" />
                        {errors.password && touched.password ? <div className='text-red-500'>{errors.password}</div> : null}
                    </div>
                    <button className='border border-black rounded-md p-[1.5rem]' type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default ValidationSchemaExample