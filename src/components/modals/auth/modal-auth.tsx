import React, { FormEvent } from "react";
import { Input } from "../../forms/inputs/input";
// import { LinkButton } from "../../buttons/link-button";
import styles from "./modal-auth.module.css";
import { sendNoAuthUserInfo } from "../../../store/http";
import { useDispatch } from "../../../store/store-hooks";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

export const ModalAuth = ({ showModal, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      first_name: { value: string };
      last_name: { value: string };
      patronymic?: { value: string };
      date_of_birth: { value: string };
    };

    const data = {
      first_name: target.last_name?.value,
      last_name: target.first_name?.value,
      patronymic: target.patronymic?.value,
      date_of_birth: target.date_of_birth?.value,
    };

    const result = await dispatch(sendNoAuthUserInfo(data));
    if (result) navigate("/test");
  };

  return (
    <>
      {showModal && (
        <>
          <div className={styles.overlay} onClick={onClose}></div>
          <form className={styles.auth} onSubmit={onSubmit}>
            <h2 className={styles.title}>Расскажите о себе</h2>
            <div className={styles.inputHolder}>
              <Input label='Фамилия' id='surname' name='last_name' required />
              <div className={styles.input}>
                <Input label='Имя' id='name' name='first_name' required />
              </div>
              <div className={styles.input}>
                <Input label='Отчество' id='patronymic' name='patronymic' />
              </div>
              <div className={styles.input}>
                <Input
                  label='Дата рождения'
                  id='birthday'
                  name='date_of_birth'
                  type='date'
                  required
                />
              </div>
            </div>
            <button type='submit'>Продолжить</button>
          </form>
        </>
      )}
    </>
  );
};
