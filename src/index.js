import React from 'react';
import ReactDOM from 'react-dom';
/*Por que é preciso usar classes e estados para concluir o nosso objetivo?
Como demora cerca de 6 segundos para o navegador me retornar a localização do usuário e 
para renderizar todo o resto da nossa aplicação demora menos de 1 segundo, não seria válido
mostrar primeiro a tela de estação sem antes saber a localização. Então, será necessário 
utilizar um componente de classe ao invés de um componente de função. Já que num componente de função
não é possível pausar a renderização.*/

import SeasonDisplay from './SeasonDisplay'; 
import Spinner from './Spinner'; 

class App extends React.Component {
    //primeira função a ser chamada antes de qualquer outra
    /*
    constructor(props){
        super(props);
        //declarando o state como objeto e inicializando com as propriedades que eu vou precisar
        //que nesse caso é apenas a latitude do usuário
        //essa é a única vez que fazemos uma atribuição DIRETA para o this.state
        //se quisermos atualizar esse valor ( atribuir um valor diferente ) chamamos setState!!
        this.state = { lat: null , errorMessage: '' };
        //lat é null porque não sabemos ainda qual é o seu valor mas eventualmente saberemos
        //como o state é um objeto javascript, para utilizá-lo usaremos chaves
    };
    */
    state = { lat: null, errorMessage: '' };
    

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition( 
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    checkLocation(){
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error!! {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return (
                <SeasonDisplay lat={this.state.lat} />
            );
        }

        return <Spinner message="Please accept location request"/>
    }

    render(){
        return <div>{this.checkLocation()}</div>;
    };
};

ReactDOM.render(<App />, document.querySelector('#root'));