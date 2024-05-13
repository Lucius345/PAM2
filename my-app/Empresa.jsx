import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Empresa({ nome, valorMercado }){
    return(
        <View style={estilo.container}>
            <Text style={estilo.info}>{nome}</Text>
            <Text style={estilo.info}>${valorMercado}</Text>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {        
        flexDirection: 'row',
        padding: 10,
        width: 400
    },
    info:{
        backgroundColor: '#02a88d',
        width:185,
        margin: 2,
        fontSize:18,
        paddingVertical: 10,
        paddingStart: 5
    }
});