import React, { useState } from 'react';
import { CHAT_ID, handleMessage, dataCeckbox } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/validation';
import { validatePhone, validateName } from '../../utils/validation';
import Checkbox from '../Checkbox/Checkbox';
import { postMessage } from '../../utils/Api';
import './Record.scss';
import checkMark from '../../images/gif.gif';

const Record = ({ hendleClosePopup }) => {
  const { values, isValid, errors, handleChange } = useFormAndValidation();
  const [notification, setNotification] = useState(true);
  const [data, setData] = useState(dataCeckbox);

  const handleCheckbox = (item) => {
    return item.map((i) => (i.checked ? i.name : ''));
  };

  const updateCheckStatus = (index) => {
    setData(
      data.map((item, currentIndex) => {
        return currentIndex === index
          ? { ...item, checked: !item.checked }
          : item;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage(CHAT_ID, handleMessage(values, handleCheckbox(data)));
    setNotification(false);
  };

  return (
    <section className="record">
      {notification ? (
        <form className="record__form" onSubmit={handleSubmit}>
          <h2 className="record__title">Добро пожаловать!</h2>
          <label className="record__lable" htmlFor="record-name">
            Имя
            <input
              className="record__input"
              id="record-name"
              name="name"
              type="text"
              value={values.name || ''}
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              required
              placeholder=""
            />
            <span
              className={`record__input-error  ${
                isValid ? '' : 'record__input-error_activ'
              }`}
            >
              {validateName(values.name).message}
            </span>
          </label>
          <label className="record__lable" htmlFor="record-email">
            Телефон
            <input
              className="record__input record__input-phone"
              id="record-phone"
              name="phone"
              type="text"
              required
              value={values.phone || ''}
              minLength="11"
              maxLength="11"
              onChange={handleChange}
            />
            <span
              className={`record__input-error  ${
                isValid ? '' : 'record__input-error_activ'
              }`}
            >
              {validatePhone(values.phone).message}
            </span>
          </label>
          <div className="record__container-checkbox">
            {data.map((i, index) => {
              return (
                <Checkbox
                  key={i.id}
                  isChecked={i.checked}
                  checkHandler={() => updateCheckStatus(index)}
                  label={i.name}
                  index={index}
                />
              );
            })}
          </div>
          <textarea
            className="record__input-message"
            name="message"
            value={values.message || ''}
            rows="3"
            type="text"
            onChange={handleChange}
            placeholder=""
          />
          <button
            className="record__btn-save"
            type="submit"
            disabled={
              !isValid ||
              validatePhone(values.phone).invalid ||
              validateName(values.name).invalid
            }
          >
            Записаться
          </button>{' '}
          <div className="record__cloce" onClick={hendleClosePopup} />
        </form>
      ) : (
        <section className="record__container-true">
          <h4 className="record__container_title">
            Спасибо за обращение! С вами свяжутся в ближайшее время
          </h4>
          <img
            className="record__container_img"
            src={checkMark}
            alt="галочка"
          />
          <div className="record__cloce" onClick={hendleClosePopup} />
        </section>
      )}
    </section>
  );
};

export default Record;

{
  /* <label className="record__lable" htmlFor="record-password">
          Пароль
          <input
            className="record__input"
            id="record-password"
            name="password"
            type="password"
            required
            autoComplete="off"
            placeholder=""
            value={values.password || ''}
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span
            className={`record__input-error  ${
              isValid ? '' : 'record__input-error_activ'
            }`}
          >
            {errors.password}
          </span>
        </label> */
}
{
  /* <span
          className={`record__error-message ${
            infoMes ? 'record__error-message_activ' : ''
          }`}
        >
          {infoMes}
        </span> */
}