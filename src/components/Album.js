import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      currentVolume: 0, //assignment range input
      duration: album.songs[0].duration,
      isPlaying: false
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

   componentDidMount(){
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumeupdate: e => {
         this.setState({ currentVolume: this.audioElement.currentVolume })
       }
   };
   this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
   this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
}


   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumeupdate',this.eventListeners.volumeupdate);
   }
//assignment range input
    volumeControl(){
      this.audioElement.addEventListener('volumeupdate', (e) =>  {
          this.setState({currentVolume: this.audioElement.currentVolume});
      });
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

     handlePrevClick(){
       const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
       const newIndex = Math.max(0, currentIndex - 1);
       const newSong = this.state.album.songs[newIndex];
       this.setSong(newSong);
       this.play();
     }
     //assignment player bar button
     handleNextClick(){
       const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
       const newIndex = Math.min(4, currentIndex + 1);
       const newSong = this.state.album.songs[newIndex];
       this.setSong(newSong);
       this.play();
     }

     handleTimeChange(e) {
       const newTime = this.audioElement.duration * e.target.value;
       this.audioElement.currentTime = newTime;
       this.setState({ currentTime: newTime });
     }

     handleVolumeChange(){
       const newVolume = this.audioElement.currentVolume;
       this.setState({currentVolume: newVolume});
     }

     formatTime(seconds){
       return parseInt((seconds % 3600) / 60)+ ':' + parseInt((seconds % 3600) % 60);
       if(seconds === ""){
         return "-:--"
       }
     }

     getInitialState() {
       return {
         hover: false
       };
     }

     hover(song){
       this.setState({currentlyHoveredSong: song });
     }

     unHover(song){
       this.setState({currentlyHoveredSong: null});
     }

     songButtons(song, index) {
       if (this.state.currentlyHoveredSong === song) {
         if (this.state.currentSong === song) {
           if(this.state.isPlaying){
             return <span className = 'ion-md-pause'/>;
           }
           else{
             return <span className = 'ion-md-play'/>;
           }
         }
         return <span className = 'ion-md-play'/>;
       }
       else if(this.state.isPlaying && this.state.currentSong === song){
         return <span className = 'ion-md-pause'/>;
       }
       return index + 1;
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
           <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter = {() => this.hover(song)} onMouseLeave = {() => this.unHover(song)}>
           <td>
               {this.songButtons(song, index)}
           </td>
           <td>{song.title}</td>
           <td>{song.duration}</td>
           </tr>
          )
          }
        </tbody>
      </table>
      <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={formatTime(this.audioElement.currentTime)}
           duration={this.audioElement.duration}
           currentVolume={this.audioElement.currentVolume}
           formatTime={this.state.isPlaying}//
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={()=> this.handlePrevClick()}
           //assignment player bar songButton
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={() => this.handleVolumeChange()}
         />
      </section>

    );
  }
}

export default Album;
