import { useState } from 'react';
import { TextInput, StyleSheet, ScrollView, FlatList, Text, View, TouchableOpacity } from 'react-native';

import MoviesList from '../components/MoviesList';
import { TOKEN_TMDB } from '../config/environment';


const HomeScreen = ({ navigation }) => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  function handleSearchMovie() {
    setTimeout(async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?language=es-ES&query=${movieName}`;
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${TOKEN_TMDB}`,
            'Content-Type': 'application/json',
          }
        });
        const result = await resp.json();
        setMovies(result.results);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder='Buscar pelicula...'
        onChangeText={setMovieName}
        value={movieName}
        onChange={handleSearchMovie}
      />

      <View style={{ height: movies.length ? 200 : undefined }}>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                navigation.navigate('detailsMovie', { movie: item });
                setMovies([]);
                setMovieName('');
              }}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <ScrollView>
        <MoviesList
          movieLists='now_playing'
          title='Peliculas en estreno'
          navigation={navigation}
        />
        <MoviesList
          movieLists='top_rated'
          title='Peliculas mas valoradas'
          navigation={navigation}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    height: 500,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
