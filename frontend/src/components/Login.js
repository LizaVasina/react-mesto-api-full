import React from 'react';

function Login(props) {
    const initialData = {
        email: '',
        password: ''
    }
    const [data, setData] = React.useState(initialData);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData(data => ({
            ...data,
            [name]: value,
        }))
    } 

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!data.email || !data.password) {
            return;
        }

        props.onLogin(data);
    }

    return (
        <section className="sign sign-in">
            <h1 className="sign__title">Вход</h1>
            <form onSubmit={handleSubmit} className="sign__form sign-in__form"
                    name="Sign-in-form" method="post"
                     noValidate>
                <input type="email" placeholder="Email"
                        name="email" className="sign__input"
                        value={data.email} onChange={handleChange}
                        required></input>
                <input type="password" placeholder="Пароль"
                    name="password" className="sign__input"
                    value={data.password} onChange={handleChange}
                    required></input>
                    <button type="submit" className="sign__submit-button sign-up__submit-button">Войти</button>     
            </form>
        </section>
    )
};

export default Login;