import './imprimeNumero.css'

export function ImprimeNumeros({ numero }) {
    const cor = `cor-${numero}`;
    
    return (
      <div className={`caixaNumero ${cor}`} >
        {numero!==0?numero:''}
      </div>
    )
  }