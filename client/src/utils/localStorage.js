export const loadState = () => {
    try {
        const serializedUser = window.localStorage.getItem('auth');
        const serializedToken = window.localStorage.getItem('token');
        const serializedIsAuthenticated = window.localStorage.getItem('isAuthenticated');
        const serializedTheme = window.localStorage.getItem('theme');
        if (!serializedUser || !serializedToken) {
            return undefined;
        }

        return {
            auth: {
                user: JSON.parse(serializedUser),
                token: JSON.parse(serializedToken),
                isAuthenticated: JSON.parse(serializedIsAuthenticated),
            },
            theme: JSON.parse(serializedTheme),
        }
    } catch (err) {
        console.error("Could not load user state", err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const { user, token,isAuthenticated } = state.auth;
        const theme = state.theme;
        const serializedUser = JSON.stringify(user);
        const serializedToken = JSON.stringify(token);
        const serializedIsAuthenticated = JSON.stringify(isAuthenticated);
        const serializedTheme = JSON.stringify(theme);
console.log(serializedTheme);


        window.localStorage.setItem('auth', serializedUser);
        window.localStorage.setItem('token', serializedToken);
        window.localStorage.setItem('isAuthenticated', serializedIsAuthenticated);
        window.localStorage.setItem('theme', serializedTheme);
    } catch (err) {
        console.error("Could not save user state", err);
    }
};