import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';

import { TOKEN_TMDB } from '../config/environment';
import Movie from '../components/Movie';

const MoviesList = ({ movieLists, title, navigation }) => {
  const [gettingMovies, setGettingMovies] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
    async function getMovies() {
      try {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${movieLists}?language=es-ES`, {
          headers: {
            Authorization: `Bearer ${TOKEN_TMDB}`,
            'Content-Type': 'application/json',
          }
        });
        const result = await resp.json();
        setMovies(result.results);
      } catch (error) {
        console.log(error);
      } finally {
        setGettingMovies(false);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, }}>
      {gettingMovies ? (
        <ActivityIndicator style={styles.spinner} color='blue' size={40} />
      ) : (
        <View>
          <Text style={styles.title}>{title}</Text>
          <FlatList
            data={movies}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            renderItem={({ item }) => (
              <Movie
                type='poster'
                movie={item}
                navigation={navigation}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginVertical: 10,
  },
  separator: {
    width: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 5,
    marginBottom: 5,
  }
});

export default MoviesList;
