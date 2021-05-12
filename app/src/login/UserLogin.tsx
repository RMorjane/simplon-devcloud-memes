import './UserLogin.css'

export default function UserLogin() {
    return (
        <div className="content-main">
            <div className="content-login">
                <form action="http://localhost:4000/login" method="post">
                    <div>
                        <input className="field-login" type="text" name="username" placeholder="Enter your user name" required/>
                    </div>
                    <div>
                        <input className="field-login" type="password" name="password" placeholder="Enter your password" required/>
                    </div>
                    <div>
                        <input className="btn-login" type="submit" value="Login"/>
                    </div>
                </form>            
            </div>            
        </div>
    );
}