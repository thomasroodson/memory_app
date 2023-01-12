import styled from 'styled-components'

export const Container = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  background-color: #1550FF;
  border-radius: 10px;
  cursor: pointer;
  opacity: 1;
  transition: all ease .3s;
  animation: myAnim 2s ease 0s 1 normal forwards;

  &:hover {
    opacity: .8;
  }

  @keyframes myAnim {
    0% {
      animation-timing-function: ease-in;
      opacity: 1;
      transform: translateY(-45px);
    }
  
    24% {
      opacity: 1;
    }
  
    40% {
      animation-timing-function: ease-in;
      transform: translateY(-24px);
    }
  
    65% {
      animation-timing-function: ease-in;
      transform: translateY(-12px);
    }
  
    82% {
      animation-timing-function: ease-in;
      transform: translateY(-6px);
    }
  
    93% {
      animation-timing-function: ease-in;
      transform: translateY(-4px);
    }
  
    25%,
    55%,
    75%,
    87% {
      animation-timing-function: ease-out;
      transform: translateY(0px);
    }
  
    100% {
      animation-timing-function: ease-out;
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

export const IconArea = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, .2);
  padding: 0 15px;
`

export const Icon = styled.img`
  height: 20px;
`

export const Label = styled.div`
  height: inherit;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
`