import "./Header.scss";

interface HeaderProps {
    title: string
}

const Header = ({title} : HeaderProps) => {
    return (
        <header className="headerContainer">
            {title}
        </header>
    );
};

export default Header;
