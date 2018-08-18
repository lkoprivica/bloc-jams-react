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

  hover(song){
    this.setState({currentlyHoveredSong: song });

  }

  getIcon(song, index){
    console.log(song, index)
    if(song.hover && song.isPlaying){
      index === <span className="ion-md-pause"/>
    }
    else if(song.pause){
      return (<span className="ion-md-play"/>)
    }
    else{
      console.log(index)
      return index + 1;
    }
}
  render() {
    console.log("the currentSong is",this.state.currentSong)
console.log("the currentlyHoveredSong is",this.state.currentlyHoveredSong)

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
           <td>{/*}{this.getIcon(song, index)}*/}
               <span className={this.state.currentlyHoveredSong == song ? "ion-md-play" : "ion-md-pause"}
                onMouseEnter = { () => this.hover(song)}
               />
               {/*{
                 if(this.state.currentlyHoveredSong){
                   <span>index</span>
                 }
                    }
               </span> */}



           </td>
           <td>{song.title}</td>
           <td>{song.duration}</td>
           </tr>
          )
          }
        </tbody>
      </table>
      </section>

    );
  }
}

export default Album;
