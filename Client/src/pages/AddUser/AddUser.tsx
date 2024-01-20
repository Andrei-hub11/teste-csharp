import { useEffect } from "react";
import Formkit from "../../components/Formkit/Formkit";
import { fieldsRegister } from "../../utils/formfields/fields";
import { addNewUser, reset } from "../../utils/account/sliceAccount";
import { RegisterFormData, UserRegister } from "../../types/types";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";

function AddUser() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useTypedSelector(
    (state) => state.account
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const currentPath: string = location.pathname;

  const handleRegisterAction = (values: RegisterFormData) => {
    const newUser: UserRegister = {
      UserName: values.name,
      LastName: values.lastname,
      Email: values.email,
      Password: values.password,
      Role: currentPath === "/add-user" ? "Admin" : "User",
    };

    dispatch(addNewUser(newUser));
  };

  return (
    <div>
      <Formkit
        form={{
          fields: fieldsRegister,
          title: "Registre-se",
          renderKey: "3",
          btnText: "Cadastrar Novo Usuário",
          handleRegisterAction,
        }}
      />
    </div>
  );
}

export default AddUser;
