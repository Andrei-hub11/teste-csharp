import { FormProps } from "../../types/types";

import {
  AccountBtn,
  Container,
  Form,
  FormContainer,
  FormControl,
  FormIcon,
  FormInput,
  FormMsg,
  FormTitle,
  LoaderContainer,
  StyledLoader,
} from "./FormkitStyles";

import VisibilityOffIcon from "../../assets/icons/invisible-variant.svg";

import useFormKit from "./useFormkit";

interface formProps {
  form: FormProps;
}

function Formkit({ form }: formProps) {
  const {
    isLoading,

    isSubmitting,
    errors,
    touched,
    actions,
    values,
    fields,
    visiblePassword,
    handleSubmit,
    handleChange,
    handleBlur,
    handlePasswordVisibility,
    handleSubmitClick,
  } = useFormKit(form);
  const { title, renderKey, btnText } = form;

  const rotation = {
    initial: {
      rotate: 0,
    },
    animated: {
      rotate: 360,
      transition: {
        duration: 0.5,
        loop: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormControl key={field.name}>
              <FormInput
                placeholder={field.label}
                type={visiblePassword[field.name] ? "text" : field.type}
                value={values[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                id={field.name}
                autoComplete="off"
                aria-autocomplete="none"
              />
              <FormIcon
                src={
                  (field.name === "password" ||
                    field.name === "passwordConfirmation") &&
                  visiblePassword[field.name]
                    ? VisibilityOffIcon
                    : field.iconSrc
                }
                alt={`ícone ${field.name} do form`}
                onClick={() =>
                  field.type && handlePasswordVisibility(field.name)
                }
              />
              <FormMsg
                $isUnique={
                  errors[field.name] && touched[field.name] ? true : false
                }
              >
                {errors[field.name] && touched[field.name] && (
                  <>{errors[field.name]}</>
                )}
              </FormMsg>
            </FormControl>
          ))}
        </Form>

        <AccountBtn disabled={isSubmitting} onClick={handleSubmitClick}>
          {(btnText === "Enviar" && isLoading) ||
          (btnText === "Registrar" && isLoading) ? (
            <LoaderContainer
              variants={rotation}
              initial="initial"
              animate="animated"
            >
              <StyledLoader />
            </LoaderContainer>
          ) : (
            btnText
          )}
        </AccountBtn>
        <div>{actions[renderKey]()}</div>
      </FormContainer>
    </Container>
  );
}

export default Formkit;
