import { Outlet } from 'react-router-dom';

export default function Root () {
    return (
    <section className="hero is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <p className="title">Trello2Notion</p>
                <p className="subtitle">Convert Trello &#8482; JSON exports - this text is new</p>
                <Outlet/>
            </div>
        </div>
        <div className="hero-foot">
            Copyright &copy; Mauicio Fierro
        </div>
    </section>
    );
}