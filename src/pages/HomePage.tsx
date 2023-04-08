import { Player } from "video-react";
import { useRef } from "react";

import "video-react/dist/video-react.css";

function HomePage() {
    const vid = useRef()

    return (
        <div className="Home">
            <h1>
                Welcome to Home Page
            </h1>
            <div>
                <Player
                    autoPlay
                    ref={vid}
                >
                    <source
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        type="video/mp4"
                    />
                </Player>
            </div>
        </div>
    );
}

export default HomePage;