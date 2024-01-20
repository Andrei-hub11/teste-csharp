import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { reset, updateProfileUser } from "../../utils/account/sliceAccount";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { EditFormData, UpdateUser } from "../../types/types";
import { fieldsEdit } from "../../utils/formfields/fields";
import Formkit from "../../components/Formkit/Formkit";

function EditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useTypedSelector(
    (state) => state.account
  );

  const { UserToEdit } = useTypedSelector((state) => state.account);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const handleEditAction = (values: EditFormData) => {
    const newUser: UpdateUser = {
      UserName: values.name,
      LastName: values.lastname,
      Email: values.email,
    };

    dispatch(updateProfileUser(newUser));
  };

  return (
    <div>
      <Formkit
        form={{
          fields: fieldsEdit,
          title: "Editar Usuário",
          renderKey: "3",
          btnText: "Salvar",
          handleEditAction,
          user: UserToEdit,
        }}
      />
    </div>
  );
}

export default EditUser;
