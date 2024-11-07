  import React, { useState, useEffect } from 'react';
  import { IoPhonePortrait, IoMail, IoDocumentText, IoLocation } from "react-icons/io5";
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
      customSelect: Yup.string().required('Seçim edilməlidir'),
      customTextArea: Yup.string().required('Bu sahə doldurulmalıdır')
    });

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
      initialValues: {
        name: '',
        email: '',
        surname: '',
        customSelect: '',
        customTextArea: '',
        otherInput: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (values.customSelect === 'Diger' && !values.otherInput) {
          alert('Zəhmət olmasa, "Diger" seçiminə aid məlumatı daxil edin.');
          return;
        }

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
        <div className="mapcontent container">
          <h2>Əlaqə <span>Saxlayın</span></h2>
          <p>Müştərilərimizin rahatlığı üçün, bizimlə əlaqə saxlamaqdan çəkinməyin. Suallarınızı cavablandırmaqdan məmnun olarıq!</p>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
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
            </div>

            <div className="input-container email">
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
            </div>

            <div className="input-container">
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
            </div>

            <div className="input-container">
              <textarea
                id="customTextArea"
                name="customTextArea"
                value={values.customTextArea}
                onChange={handleChange}
                className={errors.customTextArea ? 'input-error' : ''}
                placeholder="Düşüncələrinizi burada qeyd edin"
              />
              {errors.customTextArea && <p className="error">{errors.customTextArea}</p>}
            </div>

            <div className="select-wrapper">
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
                <option value="Diger">Diger</option>
              </select>
              {errors.customSelect && <p className="error">{errors.customSelect}</p>}
            </div>

            {values.customSelect === 'Diger' && (
              <div className="input-container">
                <input
                  type="text"
                  id="otherInput"
                  name="otherInput"
                  value={values.otherInput}
                  onChange={handleChange}
                  className={errors.otherInput ? 'input-error' : ''}
                  required
                />
                <label htmlFor="otherInput" className={`placeholder ${values.otherInput ? 'filled' : ''}`}>
                  Digerini daxil edin <span className="required"> *</span>
                </label>
                {errors.otherInput && <p className="error">{errors.otherInput}</p>}
              </div>
            )}

            <button className='map-button' type="submit">
              {formLabels.sendButtonText}
            </button>
          </form>

          {showPopup && (
            <div className="popup">
              Melumatlar gonderildi
            </div>
          )}

          <div className="contact">
            {contactInfo.map((contact, index) => (
              <div className="contact-contain" key={index}>
                <div>{renderContactIcon(contact.type)}</div>
                <div className="contact-info">
                  <h3>{contact.type}</h3>
                  <p>{contact.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ width: '100%' }} className='map'>
            <iframe
              width="38%"
              height="550"
              src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sAzerbaijan+Baku!6i14!3m1!1sen!5m1!1sen"
              title="Google Maps"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>
    );
  }

  export default Map;
