import { useParams } from "react-router-dom";
import styled from "styled-components";


const Coin = () => {
  const { coinId } = useParams();

  return <div>Coin: {coinId}</div>;
};

export default Coin;
