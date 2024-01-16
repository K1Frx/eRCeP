
import { useState } from "react";
import "./admin.scss";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const Admin = () => {
    const [click, setClick] = useState(false);
    const clickFunction = () => {
        // Automatically play the iframe when the component mounts
        const playSoundCloudTrack = () => {
            const soundcloudIframe = document.querySelector('iframe[src^="https://w.soundcloud.com/player/"]') as HTMLIFrameElement;

            // Ensure the iframe is found before attempting to play it
            if (soundcloudIframe) {
                soundcloudIframe.contentWindow?.postMessage('{"method":"play"}', '*');
            }
        };

        playSoundCloudTrack();
        setClick(true)

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('DOMContentLoaded', playSoundCloudTrack);
        };
    }; // Empty dependency array ensures the effect runs once on mount

    return (
        <div className="adminContainer">
            {/* {click ?
                <>
                    <img src="https://www.icegif.com/wp-content/uploads/2023/01/icegif-162.gif" alt="Animated GIF" />
                </>
                : <Button onClick={clickFunction}>Click me</Button>}
            <div style={{ position: "absolute", left: "-9999px" }}>
                <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1242868615&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </div> */}
            <Link
                to="http://frxx.pythonanywhere.com/admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Open Django Admin</Button>
                </Link>
        </div >
    );
};

export default Admin;
