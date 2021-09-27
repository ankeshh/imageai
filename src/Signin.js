import React from 'react';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            signinemail: '',
            signinpassword: '',
        }
    }

    onemailchange = (event) => {
        this.setState({signinemail: event.target.value})
    }

    onpasswordchange = (event) => {
        this.setState({signinpassword: event.target.value})
    }

    onsubmitsignin = () => {
        fetch('https://secret-sierra-54278.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinemail,
                password: this.state.signinpassword
            })
        })
        // this.props.onrouteChange('home')
            // POST GETTING SENT AS GET BY DEFAULT WHILE DOING THIS AND WHOLE PAGE REFRESHES
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    this.props.loaduser(data);
                    this.props.onrouteChange('home');
                }
                else
                    alert("Enter your details");
            })
    }

    render(){
        const{onrouteChange} = this.props;
        return(
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required onChange={this.onemailchange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required onChange={this.onpasswordchange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick = {this.onsubmitsignin}/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onrouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Signin;