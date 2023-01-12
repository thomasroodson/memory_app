import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button'
import { InfoIntem } from './components/InfoItem'
import { GridItemType } from './types/GridItemType'

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])
  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {


  }


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoIntem label="Tempo" value="00:00" />
          <InfoIntem label="Movimentos" value="0" />
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App