/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Request = require('superagent');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var MOCKED_MOVIES_DATA = [
  {
    title: 'Test Title',
    year: '2015',
    posters: {
      thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
  },
];

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var RottenTomatoesTutorial = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this._fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderMovie}
        style={styles.listView}
      />
    )
    var movie = this.state.movies[0];
    console.log(movie);
    return this._renderMovieView(movie);
  },

  _renderLoadingView: function() {
    return (
      <View style={styles.container} >
        <Text >Loading...</Text>
      </View>
    )
  },

  _renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer} >
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },

  _fetchData: function() {
    Request
      .get(REQUEST_URL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(JSON.parse(res.text).movies),
            loaded: true
          })
        }
      });
  },

});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('RottenTomatoesTutorial', () => RottenTomatoesTutorial);
