import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
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

        props.onRegister(data);
    }

    return (
        <section className="sign sign-up">
            <h1 className="sign__title">Регистрация</h1>
            <form className="sign__form sign-up__form"
                    name="Sign-up-form" method="post"
                    onSubmit={handleSubmit} noValidate>
                <input type="email" placeholder="Email"
                        name="email" className="sign__input"
                        value={data.email} onChange={handleChange} 
                        required></input>
                <input type="password" placeholder="Пароль"
                        name="password" className="sign__input"
                        value={data.password} onChange={handleChange} 
                        required></input>
                    <button type="submit" className="sign__submit-button sign-up__submit-button">Зарегистрироваться</button>     
            </form>
            <Link to="/sign-in" className="sign__button sign-up__button">
                Уже зарегистрированы? Войти
            </Link>
        </section>
    )
};

export default Register;