import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View } from 'react-native';



module.exports = {
    screen: function () {

        const [search, setSearch] = useState("");
        const [companies, setCompanies] = useState([]);

        useEffect(() => {
            fetch('https://www.21-trading.com/search/' + search.toUpperCase(), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(async (response) => {
                    setCompanies(response);
                }).catch(error => { });
        }, [search]);

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 10 }}>Search</Text>
                    <TextInput style={styles.input} onChangeText={setSearch}
                        placeholder={"Search for companies"} />
                </View>

                <ScrollView style={{ width: "100%", marginTop: 32 }}>
                    {companies.map((stock) => {
                        return (
                            <View style={{ borderColor: "#475569", margin: 8, borderRadius: 5, borderWidth: 1 }}>
                                <Text style={{ backgroundColor: "#10b981", fontSize: 20 }}>{stock["Symbol"]}</Text>
                                <Text style={{ fontSize: 20 }}>{stock["Company Name"]}</Text>
                                <Text style={{ fontSize: 16 }}>{stock["Industry"]}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
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