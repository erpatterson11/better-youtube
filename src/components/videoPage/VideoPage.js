import React, { Component } from "react";
import { connect } from "react-redux";

import * as videoReducerActions from "../../store/reducers/selectedVideoReducer";
import * as browseReducerActions from "../../store/reducers/browseReducer";
import { setVidPlaceholderPos } from '../../store/reducers/windowSizeReducer'
import { updateCommentsHeight } from '../../store/reducers/commentsHeightReducer'

import VideoPlayer from "../videoPlayer/VideoPlayer";
import VideoInfo from "./components/videoInfo/VideoInfo";
import VideoDesc from "./components/videoDesc/VideoDesc";
import Comments from "./components/comments/Comments";
import SuggestionBar from "./components/suggestionBar/SuggestionBar";

import Util from "./../../services/funcsService";

import "./videoPage.css";

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleScroll = Util.debounce(this.handleScroll.bind(this), 50);
    this.updateVideoPlayerPlaceholderCoordinates = this.updateVideoPlayerPlaceholderCoordinates.bind(this)
  }

  componentDidMount() {
    this.updateVideoPlayerPlaceholderCoordinates()
  }

  // Custom methods
  handleScroll() {

    let top = this.props.windowDimensions.scrollTop;
    let totalHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let videoCommentsHeight = this.props.commentsHeight.commentsHeight

    // if there is a video selected and comments aren't loading and user is near the bottom of the screen
    // then request next page of comments

    if (
      this.props.videos.selectedVideo.hasOwnProperty("id") &&
      !this.props.videos.commentsLoading &&
      videoCommentsHeight < top + clientHeight
    ) {
      this.props.getVideoComments(
        this.props.videos.selectedVideo.id,
        this.props.videos.selectedVideoNextCommentsToken
      );
    }
  }

  updateVideoPlayerPlaceholderCoordinates() {
    const dim = this.vidPlaceholder.getBoundingClientRect()
    this.props.setVidPlaceholderPos(dim)
  }

  componentWillReceiveProps(nextProps) {
    const { scrollTop, windowDim, vidPlaceholder } = this.props.windowDimensions

    let nextTop = nextProps.windowDimensions.scrollTop;
    if (nextTop !== scrollTop) {
      this.handleScroll(nextTop);
    }
    let nextWidth = nextProps.windowDimensions.windowDim.width
    let dim = this.vidPlaceholder.getBoundingClientRect()
    if ( dim.left !==  vidPlaceholder.left || dim.top !== vidPlaceholder.top) {
      this.updateVideoPlayerPlaceholderCoordinates()
    }

    // let {left,top} = nextProps.windowDimensions.vidPlaceholder
    // if (
    //   left !== this.props.windowDimensions.vidPlaceholder.left || 
    //   top !== this.props.windowDimensions.vidPlaceholder.top
    // ) {
    // }
  }

  render() {
    const {
      selectedVideo,
      selectedVideoComments,
      commentsLoading,
      suggestedVideos,
      videoChannelProfile,
      selectedVideoNextCommentsToken
    } = this.props.videos;
    const { browsing } = this.props.browse;
    const { commentsHeight } = this.props.commentsHeight
    const {
      getVideoStats,
      getVideoSuggestions,
      getChannelStats,
      getMoreVideoComments,
      updateCommentsHeight
    } = this.props;

    const handleSetVideo = video => {
      getVideoStats(video.id.videoId);
      getVideoSuggestions(video.id.videoId);
      getChannelStats(video.snippet.channelId);
    };

    return (
      <div className="video-page-container card-grid">
        <div ref={ref => this.vidPlaceholder = ref} className="video-player-placeholder" />
        <VideoInfo vidInfo={selectedVideo} />
        <VideoDesc vidInfo={selectedVideo} channel={videoChannelProfile} />
        <Comments
          video={selectedVideo}
          comments={selectedVideoComments}
          loading={commentsLoading}
          getMoreComments={() =>
            getMoreVideoComments(
              selectedVideo.id,
              selectedVideoNextCommentsToken
            )
          }
          getCommentBottomHeight={updateCommentsHeight}
          commentHeight={commentsHeight}
        />
        <SuggestionBar setVideo={handleSetVideo} suggested={suggestedVideos} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videos: state.selectedVideoReducer,
    browse: state.browseReducer,
    windowDimensions: state.windowSizeReducer,
    commentsHeight: state.commentsHeightReducer
  };
}

export default connect(mapStateToProps, {
  ...browseReducerActions,
  ...videoReducerActions,
  setVidPlaceholderPos,
  updateCommentsHeight
})(VideoPage);
