import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoIntem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const time = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(time);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let temGrid = [...gridItems];
          for (let i in temGrid) {
            if (temGrid[i].shown) {
              temGrid[i].permanentShown = true;
              temGrid[i].shown = false;
            }
            setGridItems(temGrid);
            setShowCount(0);
          }
        } else {
          setTimeout(() => {
            let temGrid = [...gridItems];
            for (let i in temGrid) {
              temGrid[i].shown = false;
            }
            setGridItems(temGrid);
            setShowCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    // Resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // criar o grid
    // Grid vázio
    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tempGrid.push({ item: null, shown: false, permanentShown: false });
    }

    //preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    //jogar no state
    setGridItems(tempGrid);

    //começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let temGrid = [...gridItems];
      if (
        temGrid[index].permanentShown === false &&
        temGrid[index].shown === false
      ) {
        temGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(temGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoIntem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoIntem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
