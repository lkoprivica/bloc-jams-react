import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song) {
       this.audioElement.src = song.audioSrc;
       this.setState({ currentSong: song });
       }

    handleSongClick(song) {
       const isSameSong = this.state.currentSong === song;
       if (this.state.isPlaying && isSameSong) {
         this.pause();
       } else {
         if (!isSameSong) { this.setSong(song); }
         this.play();
       }
     }
//assignment audio playback
  getInitialState() {
    return {
      hover: false
    };
  }

onMouseEnter(){
  this.setState({isMouseInside: true });
}
onMouseLeave(){
  this.setState({isMouseInside: false });
}
hover(){
  if (song.onMouseEnter){
   <ion-icon name="play"></ion-icon> === {index + 1};
  }
//The currently playing song displays a "pause" button in place of the song number.
  else if (this.state.isPlaying === true && song.onMouseLeave){
    <ion-icon name="pause"></ion-icon> === {index + 1}
  }
//A paused song displays a "play" button in place of the song number.
  else if (this.state.isPlaying === false && song.onMouseEnter){
     <ion-icon name="play"></ion-icon> === {index + 1}
  }
}


  render() {
    return (
      <section className="album">
      <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
         <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
         </div>
      </section>
      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>

        <tbody>
          {this.state.album.songs.map((song, index) =>
           <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
           <td>{index + 1}</td>
           <td>{song.title}</td>
           <td>{song.duration}</td>
           </tr>
          )
          }
        </tbody>
      </table>
      <span className="ion-md-play" />
      <span className="ion-md-pause" />
      </section>

//assignment audio playback
//When I hover over a song, it displays a "play" button in place of the song number.
//create a hover function to put this inside of

    );
  }
}

export default Album;
