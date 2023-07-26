import { Text, View } from 'react-native';
import { useState, useEffect, } from 'react';



module.exports = {
    screen: function () {
        const [shares, setShares] = useState([]);

        useEffect(() => {
            fetch('https://www.21-trading.com/api/get-shares', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(async (response) => {
                    if (response.portfolio) {
                        setShares(response.portfolio);
                    }
                }).catch(error => { });
        }, []);

        return (
            <View>
                {shares.map((share) => {
                    return (
                        <View style={{ borderColor: "#475569", margin: 8, borderRadius: 5, borderWidth: 1 }}>
                            <Text style={{ backgroundColor: "#10b981", fontSize: 20 }}>{share.symbol}:</Text>
                            <Text style={{ fontSize: 14 }}>{share.shares} shares owned</Text>
                            <Text>{share.price} average price</Text>
                            <Text>{share.sharePrice} current price</Text>
                        </View>
                    );
                })}
            </View>
        );
    }
}