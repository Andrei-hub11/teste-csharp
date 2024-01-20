import {
  ActionBtn,
  AddContainer,
  AddText,
  BtnContainer,
  HomeContainer,
  Information,
  InformationContainer,
  InnerContainer,
  ListContainer,
  ListTitle,
  LogoutContainer,
  UserLetter,
  UserLetterContainer,
  UsersContainer,
  UsersInnerContainer,
} from "./HomeStyle";

import AddIcon from "../../assets/icons/mingcute_plus-fill.svg";
import LogoutIcon from "../../assets/icons/material-symbols_logout.svg";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { toast } from "react-toastify";
import {
  deleteUserByEmail,
  getUsers,
  logout,
  removeUser,
  reset,
  setUserToEdit,
} from "../../utils/account/sliceAccount";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const { Users, isError, isSuccess, message } = useTypedSelector(
    (state) => state.account
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess && message) {
      toast.success(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleDeleteUser = async (email: string) => {
    // Lógica para excluir o usuário (provavelmente uma chamada de API)
    try {
      dispatch(deleteUserByEmail(email));

      dispatch(removeUser(email));
    } catch (error) {
      // Tratar erros, se necessário
    }
  };

  return (
    <HomeContainer>
      <InnerContainer>
        <AddContainer onClick={() => navigate("/add-user")}>
          <img src={AddIcon} alt="" />
          <AddText>Adicionar Usuário</AddText>
        </AddContainer>
        <LogoutContainer onClick={() => dispatch(logout())}>
          <img src={LogoutIcon} alt="" />
          <AddText>Sair</AddText>
        </LogoutContainer>
      </InnerContainer>
      <ListContainer>
        <ListTitle>Lista de Usuários</ListTitle>
        {Users.map((user) => (
          <UsersContainer key={user.Id}>
            <UsersInnerContainer>
              <UserLetterContainer>
                <UserLetter>{user.UserName[0].toLocaleUpperCase()}</UserLetter>
              </UserLetterContainer>
              <InformationContainer>
                <Information>{user.UserName + " " + user.LastName}</Information>
                <Information>{user.Email}</Information>
              </InformationContainer>
            </UsersInnerContainer>
            <BtnContainer>
              <ActionBtn
                $primary
                onClick={() => {
                  navigate("/edit-user");
                  dispatch(
                    setUserToEdit({
                      Id: user.Id,
                      name: user.UserName,
                      lastname: user.LastName,
                      email: user.Email,
                    })
                  );
                }}
              >
                Editar
              </ActionBtn>
              <ActionBtn onClick={() => handleDeleteUser(user.Email)}>
                Excluir
              </ActionBtn>
            </BtnContainer>
          </UsersContainer>
        ))}
      </ListContainer>
    </HomeContainer>
  );
}

export default Home;
