import { useEffect, useState } from 'react';
import './App.css';
import { ImprimeNumeros } from './ui/imprimeNumeros';
import cima from './assets/cima.png'
import baixo from './assets/baixo.png'
import esquerda from './assets/esquerda.png'
import direita from './assets/direita.png'

function App() {

  const linhaUm = [1, 0, 0, 0];
  const linhaDois = [1, 1, 0, 0];
  const linhaTres = [1, 1, 1, 1];
  const linhaQuatro = [1, 0, 0, 0];
  // const linhaUm = [1, 2, 4, 8];
  // const linhaDois = [128, 64, 32, 16];
  // const linhaTres = [256,512, 1024, 2048];
  // const linhaQuatro = [32768, 16384, 8192, 4096];
  const [mapa, setMapa] = useState([linhaUm, linhaDois, linhaTres, linhaQuatro]);
  const [recarrega, setRecarrega] = useState(false);

  useEffect(() => {
    async function fetch() {
      setRecarrega(false)
    }
    fetch()
  }, [recarrega])

  function start() {

    let jogadasErradas = 0;

    do {
      imprimeMapa(mapa);

      const movimento = getMovimento();

      switch (movimento) {
        case "C":
          if (isJogadasParaCima(mapa)) {
            const mapaDepoisJogada = paraCima(mapa);
            const mapaDepoisNumerosRecolhidos = recolheNumerosCima(mapaDepoisJogada);
            const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
            setMapa(mapaFinalizado);
            console.log("Jogada finalizada!");
          } else {
            console.log("Jogada não permitida");
            jogadasErradas++;
          }
          break;
        case "B":
          if (isJogadasParaBaixo(mapa)) {
            const mapaDepoisJogada = paraBaixo(mapa);
            const mapaDepoisNumerosRecolhidos = recolheNumerosBaixo(mapaDepoisJogada);
            const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
            setMapa(mapaFinalizado);
            console.log("Jogada finalizada!");
          } else {
            console.log("Jogada não permitida");
            jogadasErradas++;
          }
          break;
        case "D":
          if (isJogadasParaDireita(mapa)) {
            const mapaDepoisJogada = paraDireita(mapa);
            const mapaDepoisNumerosRecolhidos = recolheNumerosDireita(mapaDepoisJogada);
            const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
            setMapa(mapaFinalizado);
            console.log("Jogada finalizada!");
          } else {
            console.log("Jogada não permitida");
            jogadasErradas++;
          }
          break;
        case "E":
          if (isJogadasParaEsquerda(mapa)) {
            const mapaDepoisJogada = paraEsquerda(mapa);
            const mapaDepoisNumerosRecolhidos = recolheNumerosEsquerda(mapaDepoisJogada);
            const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
            setMapa(mapaFinalizado);
            console.log("Jogada finalizada!");
          } else {
            console.log("Jogada não permitida");
            jogadasErradas++;
          }
          break;
      }

      if (jogadasErradas === 3) {
        console.log("Você errou 3 vezes jogo acabou");
        break;
      }

    } while (!isJogoFinalizado(mapa));

    return (
      <>
        {mapa.map(linha => {
          return linha.map(item => {
            return (
              <ImprimeNumeros numero={item} />
            )
          })
        })}
      </>
    )
  }

  function recolheNumerosBaixo(mapa) {
    const mapaTemporario = mapa;
    for (let coluna = 0; coluna < 4; coluna++) {
      const colunaTemporaria = [mapaTemporario[3][coluna], mapaTemporario[2][coluna], mapaTemporario[1][coluna], mapaTemporario[0][coluna]].filter(item => item !== 0);
      for (let linha = 3, i = 0; linha >= 0; linha--, i++) {
        if (colunaTemporaria.length > i) {
          mapaTemporario[linha][coluna] = colunaTemporaria[i];
        } else {
          mapaTemporario[linha][coluna] = 0;
        }
      }
    }
    return mapaTemporario;
  }

  function paraBaixo(mapa) {
    const mapaTemporario = mapa;
    for (let coluna = 3; coluna >= 0; coluna--) {
      for (let linha = 3; linha >= 0; linha--) {
        if (mapaTemporario[linha][coluna] !== 0) {
          if (linha > 0 && mapaTemporario[linha - 1][coluna] !== 0) {
            if (mapaTemporario[linha][coluna] === mapaTemporario[linha - 1][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha - 1][coluna] = 0;
            }
          } else {
            if (linha > 1 && mapaTemporario[linha - 2][coluna] !== 0 && mapaTemporario[linha][coluna] === mapaTemporario[linha - 2][coluna] && mapaTemporario[linha][coluna] === mapaTemporario[linha - 2][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha - 2][coluna] = 0;
            } else if (linha >= 3 && mapaTemporario[linha][coluna] === mapaTemporario[linha - 3][coluna] && mapaTemporario[linha][coluna] === mapaTemporario[linha - 3][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha - 3][coluna] = 0;
            }
          }
        }
      }
    }
    return mapaTemporario;
  }

  function isJogadasParaBaixo(mapa) {
    for (let coluna = 0; coluna < 4; coluna++) {
      if (mapa[3][coluna] === 0) {
        return true;
      }
      for (let linha = 3; linha > 0; linha--) {
        if (mapa[linha][coluna] !== 0 && mapa[linha][coluna] === mapa[linha - 1][coluna]) {
          return true;
        }
        if (linha > 1 && mapa[linha][coluna] !== 0 && mapa[linha - 1][coluna] === 0 && mapa[linha - 2][coluna] !== 0) {
          return true;
        }
        if (linha > 2 && mapa[linha][coluna] !== 0 && mapa[linha - 1][coluna] === 0 && mapa[linha - 2][coluna] === 0 && mapa[linha - 3][coluna] !== 0) {
          return true;
        }
        if (linha > 1 && mapa[linha][coluna] === 0 && mapa[linha - 1][coluna] === 0 && mapa[linha - 2][coluna] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  function recolheNumerosCima(mapa) {
    const mapaTemporario = mapa;
    for (let coluna = 0; coluna < 4; coluna++) {
      const colunaTemporaria = [mapaTemporario[0][coluna], mapaTemporario[1][coluna], mapaTemporario[2][coluna], mapaTemporario[3][coluna]].filter(item => item !== 0);

      for (let linha = 0; linha < 4; linha++) {
        if (colunaTemporaria.length <= linha) {
          mapaTemporario[linha][coluna] = 0;
        } else {
          mapaTemporario[linha][coluna] = colunaTemporaria[linha];
        }
      }
    }
    return mapaTemporario;
  }

  function paraCima(mapa) {
    const mapaTemporario = mapa;
    for (let coluna = 0; coluna < 4; coluna++) {
      for (let linha = 0; linha < 3; linha++) {
        if (mapaTemporario[linha][coluna] !== 0) {
          if (mapaTemporario[linha + 1][coluna] !== 0) {
            if (mapaTemporario[linha][coluna] === mapaTemporario[linha + 1][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha + 1][coluna] = 0;
            }
          } else {
            if (linha < 2 && mapaTemporario[linha][coluna] === mapaTemporario[linha + 2][coluna] && mapaTemporario[linha][coluna] === mapaTemporario[linha + 2][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha + 2][coluna] = 0;
            } else if (linha < 1 && mapaTemporario[linha][coluna] === mapaTemporario[linha + 3][coluna] && mapaTemporario[linha][coluna] === mapaTemporario[linha + 3][coluna]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha + 3][coluna] = 0;
            }
          }
        }
      }
    }
    return mapaTemporario;
  }

  function onClickParaCima() {
    if (isJogadasParaCima(mapa)) {
      const mapaDepoisJogada = paraCima(mapa);
      const mapaDepoisNumerosRecolhidos = recolheNumerosCima(mapaDepoisJogada);
      const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
      setMapa(mapaFinalizado);
      console.log("Jogada finalizada!");
      setRecarrega(true);
    } else {
      console.log("Jogada não permitida");
    }
  }

  function onClickParaBaixo() {
    if (isJogadasParaBaixo(mapa)) {
      const mapaDepoisJogada = paraBaixo(mapa);
      const mapaDepoisNumerosRecolhidos = recolheNumerosBaixo(mapaDepoisJogada);
      const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
      setMapa(mapaFinalizado);
      console.log("Jogada finalizada!");
      setRecarrega(true);
    } else {
      console.log("Jogada não permitida");
    }
    
  }

  function onClickParaDireita() {
    if (isJogadasParaDireita(mapa)) {
      const mapaDepoisJogada = paraDireita(mapa);
      const mapaDepoisNumerosRecolhidos = recolheNumerosDireita(mapaDepoisJogada);
      const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
      setMapa(mapaFinalizado);
      console.log("Jogada finalizada!");
      setRecarrega(true)
    } else {
      console.log("Jogada não permitida");
    }
  }

  function onClickParaEsquerda() {
    if (isJogadasParaEsquerda(mapa)) {
      const mapaDepoisJogada = paraEsquerda(mapa);
      const mapaDepoisNumerosRecolhidos = recolheNumerosEsquerda(mapaDepoisJogada);
      const mapaFinalizado = adicionaNumeroAleatorio(mapaDepoisNumerosRecolhidos);
      setMapa(mapaFinalizado);
      console.log("Jogada finalizada!");
      setRecarrega(true)
    } else {
      console.log("Jogada não permitida");
    }
  }

  function isJogadasParaCima(mapa) {
    for (let coluna = 0; coluna < 4; coluna++) {
      if (mapa[0][coluna] === 0) {
        return true;
      }
      for (let linha = 0; linha < 4; linha++) {
        if (linha < 3 && mapa[linha][coluna] !== 0 && mapa[linha][coluna] === mapa[linha + 1][coluna]) {
          return true;
        }
        if (linha < 2 && mapa[linha][coluna] !== 0 && mapa[linha + 1][coluna] === 0 && mapa[linha + 2][coluna] !== 0) {
          return true;
        }
        if (linha < 1 && mapa[linha][coluna] !== 0 && mapa[linha + 1][coluna] === 0 && mapa[linha + 2][coluna] === 0 && mapa[linha + 3][coluna] !== 0) {
          return true;
        }
        if (linha < 1 && mapa[linha][coluna] === 0 && mapa[linha + 1][coluna] === 0 && mapa[linha + 2][coluna] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  function recolheNumerosDireita(mapa) {
    const mapaTemporario = mapa;
    for (let linha = 0; linha < 4; linha++) {
      const linhaTemporaria = [mapaTemporario[linha][3], mapaTemporario[linha][2], mapaTemporario[linha][1], mapaTemporario[linha][0]].filter(item => item !== 0);
      for (let coluna = 3, i = 0; coluna >= 0; coluna--, i++) {
        if (linhaTemporaria.length > i) {
          mapaTemporario[linha][coluna] = linhaTemporaria[i];
        } else {
          mapaTemporario[linha][coluna] = 0;
        }
      }
    }
    return mapaTemporario;
  }

  function paraDireita(mapa) {
    const mapaTemporario = mapa;
    for (let linha = 3; linha >= 0; linha--) {
      for (let coluna = 3; coluna > 0; coluna--) {
        if (mapaTemporario[linha][coluna] !== 0) {
          if (mapaTemporario[linha][coluna - 1] !== 0) {
            if (mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna - 1]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna - 1] = 0;
            }
          } else {
            if (coluna > 1 && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna - 2] && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna - 2]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna - 2] = 0;
            } else if (coluna > 2 && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna - 3] && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna - 3]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna - 3] = 0;
            }
          }
        }
      }
    }
    return mapaTemporario;
  }

  function isJogadasParaDireita(mapa) {
    for (let linha = 3; linha >= 0; linha--) {
      if (mapa[linha][3] === 0) {
        return true;
      }
      for (let coluna = 3; coluna >= 0; coluna--) {
        if (coluna > 0 && mapa[linha][coluna] !== 0 && mapa[linha][coluna] === mapa[linha][coluna - 1]) {
          return true;
        }
        if (coluna > 1 && mapa[linha][coluna] !== 0 && mapa[linha][coluna - 1] === 0 && mapa[linha][coluna - 2] !== 0) {
          return true;
        }
        if (coluna > 2 && mapa[linha][coluna] !== 0 && mapa[linha][coluna - 1] === 0 && mapa[linha][coluna - 2] === 0 && mapa[linha][coluna - 3] !== 0) {
          return true;
        }
        if (coluna > 2 && mapa[linha][coluna] === 0 && mapa[linha][coluna - 1] === 0 && mapa[linha][coluna - 2] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  function paraEsquerda(mapa) {
    const mapaTemporario = mapa;
    for (let linha = 0; linha < 4; linha++) {
      for (let coluna = 0; coluna < 3; coluna++) {
        if (mapaTemporario[linha][coluna] !== 0) {
          if (mapaTemporario[linha][coluna + 1] !== 0) {
            if (mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna + 1]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna + 1] = 0;
            }
          } else {
            if (coluna < 2 && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna + 2] && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna + 2]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna + 2] = 0;
            } else if (coluna < 1 && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna + 3] && mapaTemporario[linha][coluna] === mapaTemporario[linha][coluna + 3]) {
              mapaTemporario[linha][coluna] *= 2;
              mapaTemporario[linha][coluna + 3] = 0;
            }
          }
        }
      }
    }
    return mapaTemporario;
  }

  function imprimeMapa(mapa) {
    // for (let i = 0; i < 4; i++) {
    //   for (let k = 0; k < 4; k++) {
    //     console.log((mapa[i][k] === 0 ? "." : mapa[i][k]) + "\t");
    //   }
    //   console.log();
    // }

  }

  function isJogoFinalizado(mapa) {
    // for (let i = 0; i < 4; i++) {
    //   for (let k = 0; k < 4; k++) {
    //     if (mapa[i][k] === 0) {
    //       return false;
    //     }
    //     if (k < 3 && mapa[i][k] === mapa[i][k + 1]) {
    //       return false;
    //     }
    //     if (k > 0 && mapa[i][k] === mapa[i][k - 1]) {
    //       return false;
    //     }
    //     if (i < 3 && mapa[i][k] === mapa[i + 1][k]) {
    //       return false;
    //     }
    //     if (i > 0 && mapa[i][k] === mapa[i - 1][k]) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  }

  function recolheNumerosEsquerda(mapa) {
    const mapaTemporario = mapa;
    for (let i = 0; i < 4; i++) {
      const linhaTemporaria = mapaTemporario[i].filter(item => item !== 0);

      for (let j = 0; j < 4; j++) {
        if (linhaTemporaria.length <= j) {
          mapaTemporario[i][j] = 0;
        } else {
          mapaTemporario[i][j] = linhaTemporaria[j];
        }
      }
    }
    return mapaTemporario;
  }

  function adicionaNumeroAleatorio(mapa) {
    let linha;
    let coluna;
    const mapaTemporario = mapa;
    do {
      linha = Math.floor(Math.random() * 4);
      coluna = Math.floor(Math.random() * 4);
    } while (mapaTemporario[linha][coluna] !== 0);
    mapaTemporario[linha][coluna] = Math.floor(Math.random() * 2) + 1;
    return mapaTemporario;
  }

  function isJogadasParaEsquerda(mapa) {
    for (let linha = 0; linha < 4; linha++) {
      if (mapa[linha][0] === 0) {
        return true;
      }
      for (let coluna = 0; coluna < 4; coluna++) {
        if (coluna < 3 && mapa[linha][coluna] !== 0 && mapa[linha][coluna] === mapa[linha][coluna + 1]) {
          return true;
        }
        if (coluna < 2 && mapa[linha][coluna] !== 0 && mapa[linha][coluna + 1] === 0 && mapa[linha][coluna + 2] !== 0) {
          return true;
        }
        if (coluna < 1 && mapa[linha][coluna] !== 0 && mapa[linha][coluna + 1] === 0 && mapa[linha][coluna + 2] === 0 && mapa[linha][coluna + 3] !== 0) {
          return true;
        }
        if (coluna < 1 && mapa[linha][coluna] === 0 && mapa[linha][coluna + 1] === 0 && mapa[linha][coluna + 2] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  function getMovimento() {
    //let tamanhoMovimentoDiferenteUm;
    //let movimentoDiferenteCBDE;

    // const input = new Scanner(System.in);

    // let movimento;

    // do {
    //   console.log("Escolha o próximo movimento:");
    //   console.log("C - Para cima");
    //   console.log("B - Para baixo");
    //   console.log("D - Para direita");
    //   console.log("E - Para esquerda");
    //   movimento = input.nextLine().toUpperCase();

    //   tamanhoMovimentoDiferenteUm = movimento.length() !== 1;
    //   movimentoDiferenteCBDE = !movimento.equals("C") && !movimento.equals("D") && !movimento.equals("E") && !movimento.equals("B");
    // } while (tamanhoMovimentoDiferenteUm || movimentoDiferenteCBDE);

    //return movimento;
    return "C";
  }
  return (
    <div className="App">
      <div className='header'>
        <p>2048</p>
      </div>
      <div className='body'>
        {mapa.map((linha, index) => {
          return (
            <div key={index} className='linhaCaixa'>
              {linha.map((item, index) => {
                return (
                  <ImprimeNumeros key={index} numero={item} />
                )
              })}
            </div>
          )
        })}
        <div className='botoes'>
          <button onClick={onClickParaEsquerda}>
            <img src={esquerda} alt="flecha apontando para esquerda" />
          </button>
          <button onClick={onClickParaCima}>
            <img src={cima} alt="flecha apontando para cima" />
          </button>
          <button onClick={onClickParaBaixo}>
            <img src={baixo} alt="flecha apontando para baixo" />
          </button>
          <button onClick={onClickParaDireita}>
            <img src={direita} alt="flecha apontando para direita" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
