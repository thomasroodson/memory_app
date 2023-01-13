import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button'
import { InfoIntem } from './components/InfoItem'
import { GridItem } from './components/GridItem'
import { GridItemType } from './types/GridItemType'
import { items } from './data/items'

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])
  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {
    // Resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    // criar o grid
    // Grid vázio
    let tempGrid: GridItemType[] = []
    for (let i = 0; i < (items.length * 2); i++){
      tempGrid.push({item: null, shown: false, permanentShown: false})
    }

    //preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while(pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length *2))
        }
        tempGrid[pos].item = i
      }
    }

    //jogar no state
    setGridItems(tempGrid)
    
    //começar o jogo
    setPlaying(true)

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
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem key={index} />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App