import './LoginPage.css';

function LoginPage({ }) {

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div id="faded_background">
        <form id="login_form" onSubmit={handleSubmit} className="container-fluid h-75 w-75">
            <div className="card" id="login_card">
                <div className="card-body">
                    <div className='row'>
                        <div id="logo">
                        Here is The logo!
                        </div>
                    </div>
                    <div className='row login-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Username:
                        </div>
                        <div className='col-6'>
                            <input className="login_input form-control"></input>
                        </div>
                    </div>
                    <div className='row login-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            Password:
                        </div>
                        <div className='col-6'>

                            <input className="login_input form-control"></input>
                        </div>
                    </div>
                    <div className='row login-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            <span id="login_keep_login_text">Keep me logged in</span>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                    <div className='row login-row'>
                    <div className='col-1'></div>
                        <div className='col-5'>
                            <button className='btn btn-primary' id="login_register_btn">Create new account</button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-3'>
                            <button className='btn btn-primary' id="login_login_btn">Log in</button>
                        </div>
                    </div>
                    <div className='row login-row' id="login_read_more">
                        <div className='col-12'>
                            <center>
                                Click <a href="#">Here</a> to read more about Trivia Project
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}

export default LoginPage;