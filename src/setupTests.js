// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//Explicación de como instalar Enzyme en el video 59:
//Configuracion de Enzyme
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//Instalacion de Enzyme to JSON
import {createSerializer} from 'enzyme-to-json';

//Inicializaciòn del Enzyme:
Enzyme.configure({ adapter: new Adapter() });

//Inicialización del Enzyme to JSON
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
