import axios from 'axios';

let API_URL = process.env.VUE_APP_BACKEND_URL + 'auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login/', {
                email: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'registration/', {
            name: user.username,
            surname: "123",
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();