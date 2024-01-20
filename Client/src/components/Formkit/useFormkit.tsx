import { useState } from "react";

import * as yup from "yup";
import { useTypedSelector } from "../../app/store";
import { InformationText } from "./FormkitStyles";
import {
  Actions,
  LoginFormData,
  RegisterFormData,
  FormProps,
  EditFormData,
} from "../../types/types";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

interface FormValues {
  [key: string]: string;
}

interface VisibilityPasswordState {
  [key: string]: boolean;
}
const useFormKit = (form: FormProps) => {
  const {
    fields,
    handleRegisterAction,
    handleLoginAction,
    handleEditAction,
    user,
  } = form;
  const { isLoading } = useTypedSelector((state) => state.account);

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] =
    useState<VisibilityPasswordState>({});

  const handleChangeIcon = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordVisibility = (name: string) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? false : true,
    }));
  };

  const initialValues: FormValues = Object.fromEntries(
    fields.map((field) => [field.name, user ? user[field.name] || "" : ""])
  );

  const validations = yup
    .object()
    .shape(
      Object.fromEntries(
        form.fields.map((field) => [
          field.name,
          field.validation ||
            yup.string().required(`${field.label} é requerido`),
        ])
      )
    );

  const actions: Actions = {
    "1": () => (
      <InformationText>
        Ou{" "}
        <a onClick={() => navigate("/register")} role="register-link">
          registre-se
        </a>
        , se ainda não possui uma conta
      </InformationText>
    ),
    "2": () => (
      <InformationText>
        Ou faça{" "}
        <a onClick={() => navigate("/login")} role="login-link">
          login
        </a>
        , se possui uma conta
      </InformationText>
    ),
    "3": () => (
      <InformationText>
        {" "}
        <a onClick={() => navigate("/home")} role="login-link">
          Cancelar
        </a>
      </InformationText>
    ),
  };

  function isRegisterFormData(
    data: Partial<RegisterFormData>
  ): data is RegisterFormData {
    return (
      typeof data?.name === "string" &&
      typeof data?.lastname === "string" &&
      typeof data?.email === "string" &&
      typeof data?.password === "string" &&
      typeof data?.passwordConfirmation === "string"
    );
  }

  function isLoginFormData(
    data: Partial<LoginFormData>
  ): data is LoginFormData {
    return (
      typeof data?.email === "string" && typeof data?.password === "string"
    );
  }

  function isEditFormData(data: Partial<EditFormData>): data is EditFormData {
    return (
      typeof data?.name === "string" &&
      typeof data?.lastname === "string" &&
      typeof data?.email === "string"
    );
  }

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (isRegisterFormData(values)) {
      const registerData: RegisterFormData = values;
      handleRegisterAction && handleRegisterAction(registerData);
    }

    if (isLoginFormData(values)) {
      const loginData: LoginFormData = values;
      handleLoginAction && handleLoginAction(loginData);
    }

    if (isEditFormData(values)) {
      const editData: EditFormData = { ...values, Id: user ? user.Id : "" };
      handleEditAction && handleEditAction(editData);
    }

    actions.resetForm();
  };

  const handleSubmitClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleSubmit();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<FormikValues>({
    initialValues,
    validationSchema: validations,
    onSubmit,
  });

  return {
    fields,
    values,
    errors,
    touched,
    isSubmitting,
    isLoading,
    initialValues,
    validations,
    actions,
    isChecked,
    visiblePassword,
    setIsChecked,
    setVisiblePassword,
    handleChangeIcon,
    handleBlur,
    handleChange,
    handlePasswordVisibility,
    onSubmit,
    handleSubmit,
    handleSubmitClick,
  };
};

export default useFormKit;
