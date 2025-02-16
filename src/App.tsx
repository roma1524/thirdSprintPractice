// @ts-ignore
import './App.css';
import {Todolists} from '@/Todolists/Todolists.tsx';
import {Header} from '@/components/Header/Header.tsx';


function App() {

    return (
        <div className="App">
            <Header/>
            <Todolists />
        </div>
    );
}

export default App;
