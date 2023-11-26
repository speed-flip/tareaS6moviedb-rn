import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import formatDate from '../helpers/formatDate';

const Movie = ({ type, movie, navigation }) => {

  function handlePressMovie() {
    navigation.navigate('detailsMovie', { movie });
  }

  return type == 'poster' ? (
    <TouchableOpacity
      onPress={handlePressMovie}
    >
      <Image
        style={styles.imagen}
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
      />
      <Text style={{ width: 150 }}>{movie.title}</Text>
    </TouchableOpacity>
  ) : (
    <View>
      <Image
        style={styles.fullImage}
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
      />
      <View
        style={{ padding: 10 }}
      >
        <Text style={styles.title}>
          {movie.title}
        </Text>

        <Text style={styles.texto}>
          Idioma original: {''}
          <Text style={styles.span}>{movie.original_language}</Text>
        </Text>

        <Text style={styles.texto}>
          Popularidad: {''}
          <Text style={styles.span}>{movie.popularity}</Text>
        </Text>

        <Text style={styles.texto}>
          Fecha de estreno: {''}
          <Text style={styles.span}>{formatDate(movie.release_date)}</Text>
        </Text>

        <Text style={styles.overview}>
          {movie.overview}
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
  },
  fullImage: {
    height: 300,
  },

  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  texto: {
    fontSize: 14,
  },
  span: {
    fontWeight: 'bold',
  },
  overview: {
    marginTop: 10,
  }
});

export default Movie;
