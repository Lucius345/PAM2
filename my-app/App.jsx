import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet} from 'react-native';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import Empresa from './Empresa';

const theme = {
  colors: {
    primary: '#04534d',
  }
};

export default function App() {
  const [dados, setEmpresas] = useState([]);
  const [busca, setBusca] = useState('');

  async function getDados(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }

  useEffect(() => {
    getDados(`http://localhost:3000/empresa?nome=${busca}`).then((listaDeEmpresas) => {
      setEmpresas(listaDeEmpresas);
    });
  }, [busca]);

  const exibirItens = ({ item }) => {
    return <Empresa nome={item.Nome} valorMercado={item.ValorDeMercado} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Empresas</Text>
      <View>
        <PaperProvider theme={theme}>
          <TextInput
            style={styles.campoBusca}
            label='Buscar ...'
            value={busca}
            onChangeText={setBusca}
          />
        </PaperProvider>
      </View>
      <View style={styles.listaEmpresa}>
        <FlatList
          data={dados}
          renderItem={exibirItens}
          keyExtractor={(item) => item.Id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listaEmpresa: {
    height: 600
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#03363a',
    marginVertical: 30
  },
  campoBusca: {
    width: 370,
    backgroundColor: '#ffffff',
  }
});
