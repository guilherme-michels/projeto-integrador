import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api';
import { getUserMe, validateLogin } from '../api/User/user.service';
import { SplashPage } from '../pages/SplashPage/SplashPage';

const TOKEN = '@user/token';

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem(TOKEN);
        if (storedToken) {
            Api.defaults.headers.common.Authorization = 'Bearer ' + storedToken;
        }

        return storedToken;
    });

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<{ name: string, cargo: string } | null>(null);
    const [error, setError] = useState<unknown>(null);
    const navigate = useNavigate()
    const toast = useToast();


    const signIn = useCallback(
        async (user) => {
            try {
                setLoading(true);
                const result = await validateLogin(user);
                localStorage.setItem(TOKEN, result.token);
                Api.defaults.headers.common.Authorization = 'Bearer ' + result.token;
                setToken(user);
                setUser({ name: result.person.name, cargo: result.person.cargo })

                const startTime = Date.now();

                while ((Date.now() - startTime) < 4000) {
                    setLoading(true)
                }
                setLoading(false)

                toast({
                    position: 'top-right',
                    description: "Bem vindo(a) " + result.person.name,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })

            } catch (error) {
                toast({
                    position: 'top-right',
                    description: 'Autenticação inválida!',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })

                setError(error)
                setUser(null)

                setLoading(false)
            }
        },
        [navigate, toast]
    );


    const signOut = useCallback(() => {
        localStorage.removeItem(TOKEN);
        setUser(null);
        setToken(null);
        navigate("/");
    }, [navigate]);

    const isAuthenticated = useCallback(() => {
        return !!localStorage.getItem(TOKEN);
    }, []);

    const validateLoggedUser = useCallback(async () => {
        try {
            if (!isAuthenticated()) {
                signOut();
                setLoading(false);
                return
            };

            setLoading(true);
            const response = await getUserMe();
            setUser({ name: response.person.name, cargo: response.person.cargo });
            setLoading(false);

        } catch (err) {
            signOut();
            navigate("/");
            setLoading(false);
            toast({
                position: 'top-right',
                description: 'Sessão expirada. Faça login novamente.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }, [signOut, isAuthenticated, toast, navigate]);

    useEffect(() => {
        validateLoggedUser();
    }, [validateLoggedUser]);

    return (
        <AuthContext.Provider
            value={{
                credentials: token,
                user,
                signIn,
                signOut,
                isAuthenticated,
                getLoggedUser: validateLoggedUser,
                loading,
                errorSignIn: error,
            }}
        >
            {children}
            {loading ? <SplashPage /> : null}

        </AuthContext.Provider>
    );
};

function useAuth(): any {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
