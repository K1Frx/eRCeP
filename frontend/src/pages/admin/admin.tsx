
import { useState } from "react";
import "./admin.scss";
import Button from "react-bootstrap/esm/Button";

const Admin = () => {
    const [click, setClick] = useState(false);
    const clickFunction = () => {
        setClick(true)
        // Automatically play the iframe when the component mounts
        const playSoundCloudTrack = () => {
            const soundcloudIframe = document.querySelector('iframe[src^="https://w.soundcloud.com/player/"]') as HTMLIFrameElement;

            // Ensure the iframe is found before attempting to play it
            if (soundcloudIframe) {
                soundcloudIframe.contentWindow?.postMessage('{"method":"play"}', '*');
            }
        };

        playSoundCloudTrack();

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('DOMContentLoaded', playSoundCloudTrack);
        };
    }; // Empty dependency array ensures the effect runs once on mount

    return (
        <div className="adminContainer">
            <h1 className="title">Admin</h1>
            {click ?
                <>
                    <img src="https://www.icegif.com/wp-content/uploads/2023/01/icegif-162.gif" alt="Animated GIF" />
                </>
                : <Button onClick={clickFunction}>Click me</Button>}
            <div style={{ opacity: 0 }}>
                <iframe allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1242868615&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true?autoplay=1"></iframe>
            </div>
        </div >
    );
};

export default Admin;
