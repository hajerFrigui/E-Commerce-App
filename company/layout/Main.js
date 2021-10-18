import Container from "./Container";
import Dashboard from "../components/Dashbord/Dashboard";
import Header from "../components/header/Header";
import Typography from "../components/typography/Typography";

const Main = ({ title, children, ...rest }) => {
  return (
    <>
      <Container display="flex" position="relative">
        <Dashboard />
        <main className="main">
          <Header />
          <div className="main__container">
            <Typography title={title} />
            <div style={{ ...rest }}>{children}</div>
          </div>
        </main>
      </Container>

      <style jsx>
        {`
          .main {
            flex: 1;
            background-color: rgb(250, 250, 250);
            min-height: 100%;
            color: #000;
          }

          .main__container {
            width: 100%;
            padding: 3rem 1rem;
          }
        `}
      </style>
    </>
  );
};

export default Main;
