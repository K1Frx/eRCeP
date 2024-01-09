import "./Loader.scss"

interface LoaderProps {
    style?: React.CSSProperties;
}

export function Loader(props: LoaderProps) {
    return (
        <div className="loader-container" style={props.style}>
            <div className="loader" />
        </div>
    )
}