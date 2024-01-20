import styled from "styled-components";
import { AppearanceProps } from "../../types/types";

export const HomeContainer = styled.section`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.6rem;
  height: 10.4rem;
  background: ${({ theme: { colors } }) => colors.secondary_bg};
  padding: 1rem;
  cursor: pointer;
`;

export const LogoutContainer = styled(AddContainer)``;

export const AddText = styled.p`
  font-size: 1.6rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.text};
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

export const ListTitle = styled.h1`
  font-size: 3.2rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.text};
  background: ${({ theme: { colors } }) => colors.secondary_bg};
  width: 41.8rem;
  height: 7.8rem;
  padding: 2rem;
`;

export const UsersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const UsersInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const UserLetterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10.9rem;
  width: 10.9rem;
  background: blue;
  border-radius: 50%;
`;

export const UserLetter = styled(ListTitle)`
  font-size: 6.4rem;
  padding: unset;
  background: unset;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Information = styled.p`
  font-size: 1.6rem;
  text-align: left;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.text};
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ActionBtn = styled.a<AppearanceProps>`
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: bold;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: ${({ theme: { colors } }) => colors.text};
  padding: 0.8rem 4.8rem;
  border: 0.1rem solid
    ${({ theme: { colors }, $primary }) =>
      $primary ? colors.primary : "#B7001F"};
  height: 4rem;
  cursor: pointer;
`;

export const Divider = styled.hr`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    //inicial de 290px (29rem)
    width: 90%;
    height: 2px;
  }
`;
