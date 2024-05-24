import '../App.css';
import '../styles/HomeComponent.css';

function profile(){
    return(
        <div>
            <ul>
                <li className="auth" onClick={()=>clickLogin()}>Profile</li>
            </ul>
        </div>
    );
}

export default profile;
