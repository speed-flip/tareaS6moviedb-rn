import Movie from '../components/Movie';

const DetailsMovie = ({ navigation, route }) => {
  const { movie } = route.params;

  return (
    <Movie
      movie={movie}
      type='details'
    />
  )
}

export default DetailsMovie;
