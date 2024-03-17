import React, { useState } from 'react';
import styles from './Contact.module.css';
import Navbar1 from '../LandingPage/Navbar';
import Logo from './Logo.png';
import emailjs from '@emailjs/browser';
import MetaData from '../../MetaData';
import { useToast } from "@chakra-ui/toast";

const InputField = ({ type, name, id, placeholder, value, handleChange }) => (
  <div className={styles.inputGroup}>
    <input
        className={styles.input}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
    />
        <label className={styles.label} htmlFor={id}>{placeholder}</label>
  </div>
);

const TextAreaField = ({ name, id, placeholder, value, handleChange }) => (
  <div className={styles.textareaGroup}>
    <input
      className={styles.input}
      name={name}
      id={id}
      rows="5"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
    <label className={styles.label} htmlFor={id}>{placeholder}</label>
  </div>
);

const SubmitButton = ({ handleSubmit }) => (
  <div className={styles.buttonDiv}>
    <button id='ContactButton' type="submit" onClick={handleSubmit}>Send</button>
  </div>
);

const ContactForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
        .send(
        'service_lqcjgfu', // paste your ServiceID here (you'll get one when your service is created).
        'template_vu842kj', // paste your TemplateID here (you'll find it under email templates).
        {
            from_name: formData.firstName +" "+ formData.lastName,
            to_name: 'ConnVerse', // put your name here.
            from_email: formData.email,
            to_email: 'connverse22@gmail.com', //put your email here.
            message: formData.message,
        },
        '4nn9vaVYg9qqQwfZf' //paste your Public Key here. You'll get it in your profile section.
        )
        .then(
        () => {
            toast({
                title: "Thank You!",
                description: "We will get back to you as soon as possible",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        },
        (error) => {
          console.log(error);
          toast({
              title: "Something went wrong!",
              description: "Please try again",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
          });
        }
    );
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

    return (
    <>
      <MetaData title={'Contact Us'} />
        <Navbar1 />
        <img
            src={Logo}
            style={{top:'50%',left: '50%', position:'fixed',transform: 'translate(-50%, -50%)',zIndex:'-1',height:'100vh', width:'auto', opacity:'20%', margin:'0 auto',display:'block'}}
        />
        <div className={styles.main} style={{fontFamily: "'Overpass Mono', monospace"}}>
        <div className={styles.title}>Contact us</div>
        <div className={styles.titleInfo}>We'll get back to you soon!</div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
            type="text"
            name="firstName"
            id={styles.firstName}
            placeholder="First name"
            value={formData.firstName}
            handleChange={handleChange}
            />
            <InputField
            type="text"
            name="lastName"
            id={styles.lastName}
            placeholder="Last name"
            value={formData.lastName}
            handleChange={handleChange}
            />
            <InputField
            type="email"
            name="email"
            id={styles.eMail}
            placeholder="E-mail"
            value={formData.email}
            handleChange={handleChange}
            />
            <TextAreaField
            name="message"
            id={styles.message}
            placeholder="Message"
            value={formData.message}
            handleChange={handleChange}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </form>
        </div>
    </>
  );
};

export default ContactForm;
