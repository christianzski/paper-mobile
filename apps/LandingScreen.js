import { StyleSheet, Text, Image, Button, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';



module.exports = {
    screen: function ({ navigation }) {
        const navigate = () => {
            navigation.replace('Login');
        }

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} src={"https://www.21-trading.com/21-Trading.png"} />
                <Text style={{ marginBottom: 50 }}>A Paper Trading Platform</Text>
                <Text>Login to your account to get started!</Text>
                <Button color="#10b981" onPress={navigate} title="Login" />
                <StatusBar style="auto" />
            </SafeAreaView>
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
    logo: {
        width: 200, height: 50,
    },
});