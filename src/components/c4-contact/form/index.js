import React, {useRef, useState} from 'react';
import styles from "./styles.module.scss";
import {ReactComponent as ContactMe} from "../../../assets/icons/shake.svg";
import {TextField} from "@mui/material";
import {combineCss} from "../../../helpers/combineCss";
import {useFormik} from "formik";
import {validate} from "../../../helpers/validate";
import {ReactComponent as Sucsses} from "../../../assets/icons/sucses.svg";
import axios from "axios";

const FormContact = () => {
    const form = useRef();
    const [sucsses, setSucsses] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            messages: '',
        },
        validate: (values) => validate(values),
        onSubmit: async (values) => {
            await sendEmail(values);
        },
    });

    async function sendEmail(values) {


        try {
            await axios.post('https://sheltered-stream-83127.herokuapp.com/sendMessage', {
                messages: values.messages,
                email: values.email,
                name: values.name,
                subject: values.subject
            })
            setSucsses(true);
        } catch (err) {
            console.log(err)
        }

        setTimeout(() => {
            setSucsses(false);
            formik.resetForm();
        }, 3000)
    }

    return (
        <>
            <div className={combineCss(styles.alert, sucsses && styles.active)}>
                <Sucsses className={styles.sucses}/>
                <p>Thanks {formik.values.name} for messages</p>
            </div>
            <h1 className={styles.logo}>Contact</h1>
            <div className={styles.wrapper}>
                <div className={styles.imgBox}>
                    <ContactMe className={styles.img}/>
                </div>
                <div className={styles.inputsBox}>
                    <form ref={form} className={styles.formStyles} onSubmit={(e) => formik.handleSubmit(e)}>
                        <div className={styles.topInputs}>
                            <div className={styles.impotant}>
                                <TextField
                                    name='name'
                                    className={combineCss(styles.input)}
                                    type='text'
                                    label='Name'
                                    error={formik.errors.name && formik.touched.name}
                                    helperText={formik.touched.name ? formik.errors.name : null}

                                    {...formik.getFieldProps('name')}
                                    InputLabelProps={{className: combineCss(styles.test__label, formik.errors.name && styles.test__error)}}
                                    InputProps={{className: styles.test__input}}
                                />
                                <span className={formik.errors.name && styles.test__error}>*</span>
                            </div>
                            <div className={styles.impotant}>
                                <TextField
                                    name='email'
                                    className={combineCss(styles.input)}
                                    type='text'
                                    label='Email'
                                    error={!!formik.errors.email && formik.touched.email}
                                    helperText={formik.touched.email ? formik.errors.email : null}
                                    {...formik.getFieldProps('email')}
                                    InputLabelProps={{className: combineCss(styles.test__label, formik.errors.email && styles.test__error)}}
                                    InputProps={{className: styles.test__input}}
                                />
                                <span className={formik.errors.email && styles.test__error}>*</span>
                            </div>
                        </div>

                        <TextField
                            name={'subject'}
                            className={combineCss(styles.input)}
                            type='text'
                            label='Subject'
                            {...formik.getFieldProps('subject')}
                            InputLabelProps={{className: styles.test__label}}
                            InputProps={{className: styles.test__input}}
                        />

                        <TextField
                            name='messages'
                            className={combineCss(styles.input, styles.inputArea)}
                            label='Messages'
                            id="outlined-multiline-static"
                            rows={6}
                            multiline
                            {...formik.getFieldProps('messages')}
                            InputLabelProps={{className: styles.test__label}}
                            InputProps={{className: styles.test__input}}
                        />

                        <div>
                            <button className={combineCss(styles.btn)} type='submit'>
                                Send messages!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormContact;
