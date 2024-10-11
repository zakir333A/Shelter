import React, { useState, useEffect } from 'react';
import { IoPhonePortrait, IoMail, IoDocumentText, IoLocation } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Map/Map.css';

function Map() {
  const [contactInfo, setContactInfo] = useState([]);
  const [formOptions, setFormOptions] = useState([]);
  const [mapSrc, setMapSrc] = useState("");
  const [formLabels, setFormLabels] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setContactInfo(data.contactInfo);
        setFormOptions(data.formOptions);
        setMapSrc(data.map.src);
        setFormLabels(data.form);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Ad çox qısadır')
      .required('Ad daxil edilməlidir'),
    email: Yup.string()
      .email('Yanlış e-mail formatı')
      .required('E-mail daxil edilməlidir'),
    surname: Yup.string()
      .min(2, 'Soyad minimum 2 simvol olmalıdır')
      .required('Soyad daxil edilməlidir'),
    customSelect: Yup.string().required('Seçim edilməlidir')
  });

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      surname: '',
      customSelect: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);


      setShowPopup(true);
      resetForm();


      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  });

  const renderContactIcon = (type) => {
    switch (type) {
      case 'Phone':
        return <IoPhonePortrait />;
      case 'Email':
        return <IoMail />;
      case 'Fax':
        return <IoDocumentText />;
      case 'Address':
        return <IoLocation />;
      default:
        return null;
    }
  };

  return (
    <section className="map-wrapper">
      <motion.div
        className="mapcontent container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Əlaqə <span>Saxlayın</span></h2>
        <p>Müştərilərimizin rahatlığı üçün, bizimlə əlaqə saxlamaqdan çəkinməyin. Suallarınızı cavablandırmaqdan məmnun olarıq!</p>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="input-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              required
            />
            <label htmlFor="name" className={`placeholder ${values.name ? 'filled' : ''}`}>
              {formLabels.namePlaceholder} <span className="required"> *</span>
            </label>
            {errors.name && <p className="error">{errors.name}</p>}
          </motion.div>

          <motion.div
            className="input-container email"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder={formLabels.emailPlaceholder}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </motion.div>

          <motion.div
            className="input-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <input
              type="text"
              id="surname"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              className={errors.surname ? 'input-error' : ''}
              required
            />
            <label htmlFor="surname" className={`placeholder ${values.surname ? 'filled' : ''}`}>
              {formLabels.surnamePlaceholder} <span className="required"> Soyad*</span>
            </label>
            {errors.surname && <p className="error">{errors.surname}</p>}
          </motion.div>

          <motion.div
            className="select-wrapper"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <select
              id="custom-select"
              name="customSelect"
              className="custom-select"
              value={values.customSelect}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{formLabels.selectPlaceholder}</option>
              {formOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.customSelect && <p className="error">{errors.customSelect}</p>}
          </motion.div>

          <motion.button
            className='map-button'
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {formLabels.sendButtonText}
          </motion.button>
        </form>

        {showPopup && (
          <div className="popup">
            Melumatlar gonderildi
          </div>
        )}

        <motion.div className="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {contactInfo.map((contact, index) => (
            <div className="contact-contain" key={index}>
              <div>{renderContactIcon(contact.type)}</div>
              <div className="contact-info">
                <h3>{contact.type}</h3>
                <p>{contact.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div style={{ width: '100%' }} className='map'>
          <iframe
            width="32%"
            height="600"
            src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sAzerbaijan+Baku!6i14!3m1!1sen!5m1!1sen"
            title="Google Maps"
            style={{ border: 0 }}

          ></iframe>
     
        </div>

      </motion.div>
    </section>
  );
}

export default Map;
