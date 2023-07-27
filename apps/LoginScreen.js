import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, Image, Button, View } from 'react-native';
import { AuthContext } from '../App';

module.exports = {
    screen: function () {
        const { signIn } = useContext(AuthContext);

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");

        function Login() {
            fetch('https://www.21-trading.com/api/Login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    login: username,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(async (response) => {
                    console.log(response);
                    if (response.message != "Success") {
                        setError("Invalid username or password.");
                    } else {
                        navigation.replace('Home');
                        signIn();
                    }
                });
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo} src={"https://www.21-trading.com/21-Trading.png"} />
                <Text style={{ marginBottom: 50 }}>A Paper Trading Platform</Text>

                <View>
                    <Text style={{ fontSize: 10 }}>Username</Text>
                    <TextInput style={styles.input} onChangeText={setUsername}
                        placeholder={"Enter a username..."} />
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={{ fontSize: 10 }}>Password</Text>
                    <TextInput secureTextEntry={true} onChangeText={setPassword}
                        style={styles.input} placeholder={"Enter a password..."} />
                </View>


                <Button color="#10b981" onPress={Login} title="Login" />
                <Text style={{ color: "#dc2626" }}>{error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
    },
    input: {
        borderBottomWidth: 1, borderColor: "#1e293b", width: 300,
        padding: 4,
    },
});