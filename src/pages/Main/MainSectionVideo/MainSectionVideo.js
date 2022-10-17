import React, { useEffect, useRef } from 'react';
import './MainSectionVideo.scss';

function MainSectionVideo() {
  const videoEl = useRef();

  useEffect(() => {
    videoEl.current.play();
  }, []);

  return (
    <section className="mainVideoSection">
      <div className="mainVideo">
        <video
          loop
          muted
          alt="mainVideo"
          src="https://player.vimeo.com/progressive_redirect/playback/520427372/rendition/720p?loc=external&oauth2_token_id=1027659655&signature=2b803b53f7f8fbc77ef6ba46a45e2927ccdcfbe46801953c0707cd63d44c359d"
          ref={videoEl}
        />
      </div>
      <div className="mainVideoInfo">
        <span className="videoTitle">Magazine B</span>
        <span className="videoIssueNum">ISSUE NO.89</span>
        <div className="videoDiv">ARC'TERYX</div>
        <p>
          시조새의 학명 '아르카이옵테릭스 리토그라피카'를 모티브로 지은
          브랜드명은 제조를 기반으로 두며 진화적 접근법을 취하는 아크테릭스의
          태도를 담고 있습니다.
        </p>
        <span className="shopNow">SHOP NOW</span>
      </div>
    </section>
  );
}

export default React.memo(MainSectionVideo);
