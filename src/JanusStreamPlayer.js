import React, { component, useRef, useState, useEffect } from 'react';
import { Player, ControlBar, ReplayControl,
	ForwardControl, CurrentTimeDisplay,
	TimeDivider, PlaybackRateMenuButton, VolumeMenuButton, BigPlayButton, PlayToggle, DurationDisplay, ProgressControl, FullscreenToggle} from 'video-react';

const JanusStreamPlayer = React.forwardRef((
    { 
        isPublisher, 
        status, 
        isMuted,
        onStart, 
        onStop, 
        onMute, 
        onUnmute, 
        onBandwidthChange, 
        enableCustomControl,
        customVideoControls,
        overlayImage,
        bitrate,
        cropperActive,
    }, ref ) => {
    return (
        <div className="janus-video-container">
            {/*<div className="janus-video-status">
                {status === "Ready" && (
                    <span style={{color:"grey"}}>Ready</span>
                )}
                {status === "Paused" && (
                    <span style={{color:"grey"}}>Paused</span>
                )}
                {status === "Live" && (
                    <span style={{color:"green"}}>Live</span>
                )}
                {status === "Error" && (
                    <span style={{color:"red"}}>Error</span>
                )}
                </div>*/}
            {(overlayImage || cropperActive) ? '' : (<div className="janus-video-status">{bitrate}</div>)}
            {overlayImage}
            <Player playsInline autoPlay ref={ref}>
                {
                    enableCustomControl ?
                    (
                        <ControlBar className="janus-control-bar-align-top">
                            {customVideoControls}
                            <VolumeMenuButton disabled />
                            <DurationDisplay disabled />
                            <ProgressControl disabled />
                            <PlayToggle disabled />
                            <TimeDivider disabled />
                            <CurrentTimeDisplay disabled />
                            <PlaybackRateMenuButton disabled />
                            <ForwardControl disabled />
                        </ControlBar>
                    ) :
                    (
                        <ControlBar disableCompletely={true} />
                    )
                }
            </Player>
            {isPublisher && (
                <div className="janus-video-controls">
                    {status === "Paused" && (
                        <div className="janus-btn" onClick={onStart}>Start Recording</div>
                    )}
                    {status === "Live" && (
                        <div className="janus-btn" onClick={onStop}>Stop Recording</div>
                    )}

                    {status === "Live" && (
                        <React.Fragment>
                            {isMuted && (
                                <div className="janus-btn" onClick={onUnmute}>UnMute</div>
                            )}
                            {!isMuted && (
                                <div className="janus-btn" onClick={onMute}>Mute</div>
                            )}
                        </React.Fragment>  
                    )}

                    <div className="janus-select">
                        <select onChange={(e) => { onBandwidthChange(parseInt(e.target.value)*1000) }}>
                            <option value={0}>Auto</option>
                            <option value={128}>128 kbit</option>
                            <option value={256}>256 kbit</option>
                            <option value={512}>512 kbit</option>
                            <option value={1000}>1 mbit</option>
                            <option value={1500}>1.5 mbit</option>
                            <option value={2000}>2 mbit</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
})

export default JanusStreamPlayer;